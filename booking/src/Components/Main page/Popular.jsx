import React from "react";

function Popular(props) {
    return (
        <div className="container-xl shadow   rounded-5">
            <h1 className="text-center">Популярно за рубежом</h1><br/>
            <div className="row row-cols-xl-4">
                {/*Сделать так что бы ссылки были похожи на обычный текст!!!!*/}

                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Belarus.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6">Беларусь</span>
                            <br/>
                            <span className="text-secondary">Минск, Брест, Витебск</span>
                        </div>
                    </div>

                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Kazakhstan.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6">Казахстан</span>
                            <br/>
                            <span className="text-secondary">Астана, Алматы, Актау</span>
                        </div>
                    </div>

                </div>
                <div className="col col-md-4 col ">
                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Abkhazia.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6"> Абхазия</span>
                            <br/>
                            <span className="text-secondary">Гагра, Сухум, Пицундра</span>
                        </div>
                    </div>
                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Georgia.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6"> Грузия</span>
                            <br/>
                            <span className="text-secondary">Тбилиси, Батуми</span>
                        </div>
                    </div>


                </div>
            </div>
            <br/>
            <div className="row row-cols-xl-4">
                <div className="col col-md-4 col ">
                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Armenia.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6"> Армения</span>
                            <br/>
                            <span className="text-secondary">Ереван, Дилижан</span>
                        </div>
                    </div>
                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Turkey.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6">Турция</span>
                            <br/>
                            <span className="text-secondary">Анталия, Стамбул, Аланья</span>
                        </div>
                    </div>
                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Azerbaijan.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6"> Азербайджан</span>
                            <br/>
                            <span className="text-secondary">Баку, Сиазань</span>
                        </div>
                    </div>


                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Kyrgyzstan.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6"> Киргизия</span>
                            <br/>
                            <span className="text-secondary">Бишкек, Каракол</span>
                        </div>
                    </div>

                </div>
            </div>
            <br/>
            <div className="row row-cols-xl-4">
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Egypt.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6">Египет</span>
                            <br/>
                            <span className="text-secondary">Шарм-эль-Шейх, Хургада</span>
                        </div>
                    </div>


                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Thailand.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6">Тайланд</span>
                            <br/>
                            <span className="text-secondary">Пхукет, Паттайя</span>
                        </div>
                    </div>

                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/Uzbekistan.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6"> Узбекистан</span>
                            <br/>
                            <span className="text-secondary">Ташкент, Самарканд</span>
                        </div>
                    </div>

                </div>
                <div className="col col-md-4 col ">

                    <div className="row">
                        <div className="col-md-2">
                            <img src="/image/countries/UAE.svg" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <span className="h6">ОАЭ</span>
                            <br/>
                            <span className="text-secondary">Дубай, Умм-эль-Кайвайн</span>
                        </div>
                    </div>


                </div>
            </div>
            <br/>
        </div>
    );
};


export default Popular;