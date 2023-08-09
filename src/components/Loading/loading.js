import css from './loading.css'
import  "../../App.css"

const Loading = ({width, height}) =>{
    return (
        <div
            className='Loading'
            style={{width, height}}
        />
    )
}
Loading.defaultProps = {
    width: '28px',
    heigth: '28px'
};

export default Loading;