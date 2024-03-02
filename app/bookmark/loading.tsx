import style from '@/style/list.module.css'

export default function loading() {
    return (
        <div className={style.background}>
            <h2 className={style.searchcontent}>Loading...</h2>
        </div>
    )
}
