import React from 'react'
import './card.css'

const imgs = ["https://agriculturers.com/wp-content/uploads/2020/06/Como-se-clasifican-las-plantas-1000x500.jpg", "https://concepto.de/wp-content/uploads/2019/09/plantas-e1569789174411.jpg", "https://mundoagropecuario.com/wp-content/uploads/2018/10/raices-plantas.jpg", "https://www.floraqueen.com/blog/wp-content/uploads/2020/03/shutterstock_1010214562.jpg", "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000187/img/basic/a0000187_main.jpg?20200717172034&q=80&rw=750&rh=536"]

const randomNumber = () => {
    const lenImgs = imgs.length - 1
    return Math.floor(Math.random() * lenImgs) + 0
}


const CardV2 = props => {
    const { index, item } = props
    const { name, date, description } = item
    return (
        <div className="card" key={index}>
            <div className="card-img">
                <img src={imgs[randomNumber()]} loading="lazy" alt="" />
            </div>
            <div className="card-body">
                <div className="div-data">
                    <h4>Name:</h4>
                    <h5>{name}</h5>
                </div>
                <div className="div-data">
                    <h4>Description:</h4>
                    <p>{description}</p>
                </div>

                <div className="div-data">
                    <p>{date}</p>
                </div>

            </div>
        </div>
    )
}

export default CardV2