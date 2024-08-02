import React, {useState} from "react"

const Briefly = () => {
    return (
        <div className="briefly shadow-lg p-3 mb-5 bg-body-tertiary  rounded-5">
            <div className="container">
                <div className="row">
                    <div className="col" data-width="100">
                        <figure className="figure">
                            <img className="img-fluid" src="/image/otherIcons/main_page/location.png" alt="280 тысяч вариантов:
                                квартиры, отели, гостевые дома" width="100" height="100"/>
                            <figcaption className="figure-caption"><p class="lead fs-5"><b>280 тысяч вариантов:
                                квартиры, отели, гостевые дома</b></p>

                            </figcaption>
                        </figure>
                    </div>
                    <div className="col">
                        <figure className="figure">
                            <img className="img-fluid" src="/image/otherIcons/main_page/lable.jpg" alt="Цены напрямую
                                от хозяев жилья" width="100" height="100"/>
                            <figcaption className="figure-caption"><p class="lead fs-5"><b>Цены напрямую
                                от хозяев жилья.</b></p>
                            </figcaption>
                        </figure>

                    </div>
                    <div className="col">
                        <figure className="figure">
                            <img className="img-fluid" src="/image/otherIcons/main_page/arrow.png" alt="Кэшбэк бонусами после
                                каждой поездки" width="100" height="100"/>
                            <figcaption className="figure-caption"><p class="lead fs-5"><b>Кэшбэк бонусами после
                                каждой поездки</b></p>

                            </figcaption>
                        </figure>

                    </div>
                    <div className="col">
                        <figure className="figure">
                            <img className="img-fluid" src="/image/otherIcons/main_page/phone.png" alt="Круглосуточная служба
                                поддержки" width="100"
                                 height="100"/>
                            <figcaption className="figure-caption"><p class="lead fs-5"><b>Круглосуточная служба
                                поддержки</b></p>

                            </figcaption>
                        </figure>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default Briefly;