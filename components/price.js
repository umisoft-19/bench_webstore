import {useContext} from 'react'
import Context from '../utils/context'

export default function Price(props) {
    const context = useContext(Context)
    // TODO implement currency toggle
    const price_string = props.price ?  parseFloat(props.price / context.exchangeRate).toFixed("2") : "0.00"
    return <span>{context.currency} {price_string}</span>
}