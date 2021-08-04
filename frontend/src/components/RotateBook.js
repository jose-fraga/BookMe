import shadow from './bolafinal.png'
import './RotateBook.css'
import book from './codeBook.jpg'



const SpinningBook = (props) => {
    console.log(props)
    console.log(props.items ? props.items[0].volumeInfo.imageLinks.smallThumbnail : null)
    const imageUrl = props.items ? props.items[0].volumeInfo.imageLinks.smallThumbnail : ""

    return (

        <div class="content-rotate-right"
            style={{ backgroundImage: `url(${book})` }}
            // style={{ backgroundImage: `url(${imageUrl})` }}
            // style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div class="sombra3d" style={{ backgroundImage: `url(${shadow})` }}></div>


        </div>

    )
}

export default SpinningBook