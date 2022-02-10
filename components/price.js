export default function Price(props) {
    // TODO implement currency toggle
    const price_string = props.price ?  parseFloat(props.price).toFixed("2") : "0.00"
    return <span>{price_string}</span>
}