import { useDispatch } from 'react-redux';
import { API_URI } from '../../const';
import style from './CatalogProduct.module.css';
import { addProduct } from '../../store/order/orderSlice';

export const CatalogProduct = ({item}) => {
    const dispatch = useDispatch();
    return (
        <article className="product">
            <img src={`${API_URI}/${item.image}`} alt={item.title} className={style.image} />

            <p className={style.price}>{item.price}<span className="currency">&nbsp;₽</span></p>

            <h3 className={style.title}>
                <button className={style.detail}>{item.title}</button>
            </h3>

            <p className={style.weight}>{item.weight}г</p>

            <button className={style.add} type="button" onClick={() => {dispatch(addProduct({id: item.id}))}}>Добавить</button>
        </article>

    );
}