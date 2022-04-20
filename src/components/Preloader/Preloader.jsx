import css from './Preloader.module.scss';
import loadingGif from '../../assets/images/loading.gif';

function Preloader() {
    return (
        <div className={css.container}>
            <div className={css.block}>
                <img src={loadingGif} alt="загрузка" />
                <div className={css.message}>загрузка данных</div>
            </div>
        </div>
    );
}

export default Preloader;
