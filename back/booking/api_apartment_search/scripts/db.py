import dataclasses
import datetime
import json
import os
import re
from copy import deepcopy
import environs
import psycopg2
from datetime import datetime, UTC


class FromJSONToDataBase:


    def load_env_data(self):
        env = environs.Env()
        env.read_env('.env')
        return env.str('DB_NAME'), env.str('DB_HOST'), env.str('DB_PORT'), env.str('DB_USER'), env.str('DB_PASSWORD')

    def connect_to_db(self, database, host, port, user, password):
        try:
            connection = psycopg2.connect(
                f"host={host} dbname={database} user={user} password={password} port={port}"
            )

        except Exception:
            print('Connection failed')
            connection = False
        return connection

    def _drop_all_tables(self, connection):
        cursor = connection.cursor()

        cursor.execute("""SELECT table_name
                FROM   information_schema.tables
                WHERE  table_schema = 'public';""")
        all_tables = cursor.fetchall()
        list_of_command = [f"DROP TABLE {table_name[0]} CASCADE" for table_name in all_tables]
        cursor.execute(';'.join(list_of_command))
        connection.commit()

    def _clear_user_tables(self, connection):
        cursor = connection.cursor()
        cursor.execute(
            """select information_schema.tables.table_name from information_schema.tables WHERE table_name LIKE 'api%'""")
        all_tables = cursor.fetchall()
        list_of_command = [f"DELETE FROM {table_name[0]}" for table_name in all_tables]
        cursor.execute(';'.join(list_of_command))
        connection.commit()

    @staticmethod
    def _get_load_json(path):
        if os.path.isfile(path):
                with open('path', 'r', encoding='utf8') as f:
                    data = json.load(f)
                    return data
        else:
            print(f'{path} is not a file!')


    @staticmethod
    def _parse_object_list_to_int(obj):
        return obj if isinstance(obj, int | None) else obj[0]



    def _read_row_from_db(self, cursor, table_field_id, table, where_field: str | tuple, equal_field: str | tuple,
                          fetchone=True, multiply_where=False):
        def _add_quotes(obj):
            return f"'{obj}'"

        if multiply_where:
            where = ' AND '.join((f"{field}={_add_quotes(equal) if equal else 'null'}" for field, equal in
                                  zip(where_field, equal_field)))
        else:
            where = f"{where_field}='{equal_field}'"
        cursor.execute(f"SELECT {table_field_id} FROM {table} WHERE {where};")
        row_id = cursor.fetchone() if fetchone else cursor.fetchall()
        return row_id

    def _write_row_to_db(self, cursor, table, list_of_fields: tuple, data: list, external_id: int = None):
        def _convert_price_to_str_from_dict(dictionary):
            return str(dictionary.get("BYN"))

        def _convert_to_query_str(row):
            if row is None:
                return f"({str(0.0)})"
            elif isinstance(row, int | float):
                return f"({str(row)})"
            result = []
            for item in row:

                if isinstance(item, int | float):
                    result.append(str(item))
                else:
                    if isinstance(item, dict):
                        result.append(_convert_price_to_str_from_dict(item))
                    else:
                        result.append(f"'{item}'" if item is not None else f"null")

            return f"({', '.join(result)})"

        if len(list_of_fields) == 1:
            data = ', '.join(
                # проверки на general attrs values!!!!
                # (f"('{item}')" if isinstance(item, str) else str(item) for item in data)
                (f"('{item}')" if isinstance(item, str) else f"({str(item) if item is not None else 'null'})" for item
                 in data)
            )
        else:
            buffer = []
            for row in data:
                # если для записи более одной записи в таблицу за 1 раз

                buffer.append(_convert_to_query_str(row))
                data = ', '.join(buffer)
        cursor.execute(f"INSERT INTO {table} ({', '.join(list_of_fields)}) VALUES {data} RETURNING id;")
        row_id = cursor.fetchone()

        return row_id

    def i_o_db_operations(self, connection, table: str, *, table_field_id: str = "id", where_field: str | tuple = None,
                          equal_field: str | tuple = None, fetchone: bool = True, multiply_where: bool = False,
                          list_of_fields: tuple = None, data: list = None, isdata_urls: bool = False,
                          external_id: int = None,
                          isonlyread_operation: bool = True, isonlywrite_operation: bool = True, ):
        """
        TODO: table_field_id: str = "id" или лучше оставить None ? "записал id т к при чтении из БТ всегда это поле
            нужно указывать"
        :param connection: соединение для подключения к БД
        :param table: имя таблицы
        :param table_field_id: указывается название столбца ID PK указанной таблицы.

        :param where_field: указывается один столбец для оператора WHERE запроса если multiply_where = Fasle.
                            Если multiply_where = True, то указывается итерируемый объект с названиями столбцов.
                            Количество полей должно совпадать с equal_field
        :param equal_field: значения для столбца указанного в where_field(при multiply_where = Fasle.).
                            Если multiply_where = True, то указывается итерируемый объект. Количество элементов
                            должно совпадать с where_field.
                            Если элементов будет указано меньше/больше, то элементы которым не будет пары, будут
                            отброшены.
        :param fetchone: влияет на количество строк/кортежей в ответе.
        :param multiply_where: влияет на количество элементов для передачи в where_field и equal_field.
                            Default False. передавать можно только по одному элементу.

        :param list_of_fields: Поле принимает итерируемый объект, элементы(итерируемые объекты!!!) название столбцов
        куда будут заноситься данные.
                            Используется если isonlyread_operation = False
        :param data: Поле принимает итерируемый объект, элементы(итерируемые объекты!!!) данные для столбцов,
                            которые указаны в list_of_fields. Используется если isonlyread_operation = False
        :param external_id: Указывается внешний id который нужно добавить к data после обработки всех переданных столбцов.
        :param isonlyread_operation: DEFAULT = True. влияет на то какой метод будет использоваться, так же от этого параметра зависит то,
                            какие аргументы будет принимать метод.
                            isonlyread_operation = False === DEFAULT!!!
                                _read_row_from_db(
                                    self,
                                    cursor,
                                    table_field_id,
                                    table,
                                    where_field: str | tuple,
                                    equal_field: str | tuple,
                                    fetchone=True,
                                    multiply_where=False
                                 ):

                            isonlyread_operation = True
                            _write_row_to_db(
                                    self,
                                    cursor,
                                    table,
                                    list_of_fields: tuple,
                                    data: list,
                                    external_id: int = None
                                ): ...
        :param isonlywrite_operation: DEFAULT True влияет на то какой метод будет использоваться, так же от этого параметра зависит то,
                            какие аргументы будет принимать метод.См параметр isonlyread_operation
        :return:
        """
        cursor = connection.cursor()
        if isonlyread_operation:
            row = self._read_row_from_db(
                cursor,
                table_field_id,
                table,
                where_field,
                equal_field,
                fetchone=fetchone,
                multiply_where=multiply_where
            )
        else:
            row = None

        if isonlywrite_operation:
            if not row:
                row = self._write_row_to_db(
                    cursor,
                    table,
                    list_of_fields,
                    data,
                    external_id=external_id
                )
                connection.commit()
        return self._parse_object_list_to_int(row)

    def move_image_files(self, from_path, to_path):
        import shutil
        if not os.path.exists(to_path):
            os.makedirs(to_path)
        if os.path.exists(from_path):
            shutil.move(from_path, to_path)

    def run(self):
        self.move_image_files('../async_parser/data/images',
                              r'../../../../..\front\autobuy\public')
        connection = self.connect_to_db(*self.load_env_data())

        if connection:
            json_data = self._get_load_json()
            for_add_to_database = self._from_json_to_dataclass(json_data)
            # TODO: нужно что-то придумать с многократным вызовом метода i_o_db_operations
            # TODO: 1а идея это все параметры закинуть в список словарей и потом распаковывать
            for car in for_add_to_database:
                if car.manufacturer_name in self.CHANGE_MANUFACTURERS:
                    car.manufacturer_name = self.CHANGE_MANUFACTURERS[car.manufacturer_name]
                else:
                    car.manufacturer_name = car.manufacturer_name.title()
                if car.model_name.isalpha():
                    car.model_name = car.model_name.title()

                manufacturer_id = self.i_o_db_operations(
                    connection,
                    "api_autobuy_carmanufacturer",
                    where_field="manufacturer_name",
                    equal_field=car.manufacturer_name,
                    list_of_fields=("manufacturer_name",),
                    data=(car.manufacturer_name,),
                )

                model_id = self.i_o_db_operations(
                    connection,
                    "api_autobuy_carmodel",
                    where_field="model_name",
                    equal_field=car.model_name,
                    list_of_fields=("model_name", "model_url", "manufacturer_id"),
                    data=((car.model_name, car.model_url, manufacturer_id),)
                )

                general_attributes_integer_id = self.i_o_db_operations(
                    connection,
                    "api_autobuy_cargeneralattributesinteger",
                    where_field=("year_of_car_manufacture", "engine_capacity", "car_mileage", "power_reserve", "price"),
                    equal_field=(
                        car.general_attributes_integer.get("year_of_car_manufacture"),
                        car.general_attributes_integer.get("engine_capacity"),
                        car.general_attributes_integer.get("car_mileage"),
                        car.general_attributes_integer.get("power_reserve"),
                        car.general_attributes_integer.get("price")
                    ),
                    multiply_where=True,
                    list_of_fields=(
                        "year_of_car_manufacture", "engine_capacity", "car_mileage", "power_reserve", "price"),
                    data=(
                        (
                            car.general_attributes_integer.get("year_of_car_manufacture"),
                            car.general_attributes_integer.get("engine_capacity"),
                            car.general_attributes_integer.get("car_mileage"),
                            car.general_attributes_integer.get("power_reserve"),
                            car.general_attributes_integer.get("price")
                        ),
                    )
                )

                individual_attributes_id = self.i_o_db_operations(
                    connection,
                    "api_autobuy_carindividualattributes",
                    where_field=("seller_comment", "car_exchange_option"),
                    equal_field=(
                        car.individual_attributes.get("seller_comment"),
                        car.individual_attributes.get("car_exchange_option"),
                    ),
                    multiply_where=True,
                    list_of_fields=("seller_comment", "car_exchange_option"),
                    data=(
                        (
                            car.individual_attributes.get("seller_comment"),
                            car.individual_attributes.get("car_exchange_option"),
                        ),
                    )
                )

                vin_id = self.i_o_db_operations(
                    connection,
                    "api_autobuy_vin",
                    where_field="vin_value",
                    equal_field=a if (a := car.individual_attributes.get("vin")) else "null",
                    list_of_fields=("vin_value",),
                    data=(a if (a := car.individual_attributes.get("vin")) else "null",),
                    isonlyread_operation=False
                )

                automobile_id = self.i_o_db_operations(
                    connection,
                    "api_autobuy_carautomobile",
                    where_field="car_url",
                    equal_field=car.car_url,
                    list_of_fields=(
                        "car_url",
                        "car_name",
                        "counter_of_views",
                        "image_path",
                        "create_datetime",
                        "manufacturer_id",
                        "model_id",
                        "vin_id",
                        "general_attributes_integer_id",
                        "individual_attributes_id"
                    ),
                    data=(
                        (
                            car.car_url,
                            car.car_name,
                            0,
                            f"{self.FRONT_COMMON_IMAGE_PATH}/{re.search('(?<=https://autobuy.by/cars/).+', car.car_url).group()}",
                            str(datetime.now(UTC)),
                            manufacturer_id,
                            model_id,
                            vin_id,
                            general_attributes_integer_id,
                            individual_attributes_id
                        ),
                    )
                )

                for name_attrs, value_attrs in car.general_attributes.items():
                    general_attributes_name_id = self.i_o_db_operations(
                        connection,
                        "api_autobuy_cargeneralattributes",
                        where_field="general_attributes_name",
                        equal_field=name_attrs,
                        list_of_fields=("general_attributes_name",),
                        data=(name_attrs,)
                    )

                    general_attrinates_value_id = self.i_o_db_operations(
                        connection,
                        "api_autobuy_cargeneralattributesvalues",
                        where_field="general_attributes_value",
                        equal_field=value_attrs.get("BYN") if isinstance(value_attrs, dict) else value_attrs,
                        list_of_fields=("general_attributes_value",),
                        data=(value_attrs.get("BYN") if isinstance(value_attrs, dict) else value_attrs,),
                    )

                    self.i_o_db_operations(
                        connection,
                        "api_autobuy_connectorgeneralattributes",
                        where_field=(
                            "general_attributes_id", "general_attributes_value_id", "automobile_id"
                        ),
                        equal_field=(
                            general_attributes_name_id, general_attrinates_value_id, "automobile_id"),
                        multiply_where=True,
                        list_of_fields=(
                            "general_attributes_id", "general_attributes_value_id", "automobile_id"),
                        data=(
                            (
                                general_attributes_name_id, general_attrinates_value_id, automobile_id
                            ),
                        ),
                        isonlyread_operation=False

                    )

                for group_name, options in car.car_options.items():
                    group_id = self.i_o_db_operations(
                        connection,
                        "api_autobuy_groupcaroptions",
                        where_field="group_name",
                        equal_field=group_name,
                        list_of_fields=("group_name",),
                        data=(group_name,)
                    )
                    for option_name in options:
                        option_id = self.i_o_db_operations(
                            connection,
                            "api_autobuy_caroptions",
                            where_field="option_name",
                            equal_field=option_name,
                            list_of_fields=("option_name",),
                            data=(option_name,)
                        )

                        self.i_o_db_operations(
                            connection,
                            "api_autobuy_connectorcaroptions",
                            list_of_fields=("car_options_id", "group_car_option_id", "automobile_id"),
                            data=((option_id, group_id, automobile_id),),
                            isonlyread_operation=False
                        )
                # вдруг ссылки на сайт оригинала понадобятся когда-то)
                # for image_url in car.links_to_photos:
                #     links_to_photos_id = self.i_o_db_operations(
                #         connection,
                #         "api_autobuy_linkstophotos",
                #         list_of_fields=("image_url",),
                #         data=(image_url,),
                #         isonlyread_operation=False
                #     )

                print(f'[INFO] Car {car.car_url}')


db = FromJSONToDataBase()
db.run()

# db._drop_all_tables(
#     db.connect_to_db(
#         *db.load_env_data()
#     )
# )

#
# db._clear_user_tables(
#     db.connect_to_db(
#         *db.load_env_data()
#     )
# )
