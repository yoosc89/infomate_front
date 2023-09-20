import styles from './chatComponent.module.css';
import meterialIcon from '../common/meterialIcon.module.css';
const ChatComponent = () => {

    const menuList = [
        {menu: 'menu'},
        {menu: 'group'},
        {menu: 'forum', count: 1},
        {menu: 'chat', count: 10},
        {menu: 'settings'},
    ]

    return (
        <>
            <div className={styles.container}>
                <div className={styles.menubar}>
                    {
                        menuList.map((item, index) =>
                            <ChatMenuItem index={index} text={item.menu} count={item?.count} />
                        )
                    }

                </div>
                <div className={styles.contents}>
                    content
                </div>
            </div>
        </>
    )
}
export default ChatComponent;

export const ChatMenuItem = ({text, count}) => {
    return (
        <div className={styles.menuItem}>
            <button>
                {
                    count
                    && <div className={styles.notiCount}>
                            <div>
                                <span>1</span>
                            </div>
                        </div>
                }
                <span className={meterialIcon.meterialIcon}>{text}</span>
            </button>
        </div>
    )
}