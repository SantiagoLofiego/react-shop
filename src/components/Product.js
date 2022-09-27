import './product.css'

function Producto (props) {
    const product = props.prod;
    return (
        <div title="Ver producto">
            <span><img className="imageProd" src={product.image} alt="producto" /></span>
            <h4>{product.title}</h4>
            <div>{product.shortDescription}</div>
            <div>Precio: $ {product.price}</div>
            <div>Stock: {product.stock}</div>
            <div>
                <button title="Ver detalle">Detalle</button>
                <button title="Agregar al carrito">Agregar</button>
            </div> 
        </div>
    )
}

export default Producto;