import styles from "./Header.module.scss";

export function Header () {
    return (
        <header role="banner" className={styles.header}>
            <div className={styles.logo}>
                <svg width="16" height="24" xmlns="http://www.w3.org/2000/svg" role={"presentation"}>
                    <g fill="none" fillRule="evenodd">
                        <path d="M0 0h16v24H0z"/>
                        <path
                            d="M6 21H2.5C1.137 21 0 20.153 0 18.8V4.4c0-.224.176-.4.4-.4h15.2c.224 0 .4.176.4.4v14.4c0 1.353-1.137 2.2-2.5 2.2H12c-1.458 0-2.395.276-3.6 1.5-.263.253-.63.668-1.1 1.245a.793.793 0 01-1.102.055c-.163-.145-.198-.346-.198-.563V21zM2 6v12.4c0 .363.211.6.6.6h5.1v1.7C9.007 19.54 10.288 19 12 19h1.4c.389 0 .6-.237.6-.6V6H2z"
                            fill="#FFF" fillRule="nonzero"/>
                    </g>
                </svg>
                mos.ru
            </div>
        </header>
    );
}