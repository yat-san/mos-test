import styles from "./Loader.module.scss";

export function Loader (props) {
    return (
        <div className={styles.loader} aria-labelledby={"loader-label"}>
            <span id={"loader-label"} className="visuallyHidden">
                {props.label}
            </span>
            <svg role={"presentation"} className={styles.spinner} width="55" height="14" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <circle cx="15" cy="15" r="15">
                    <animate attributeName="r" from="15" to="15"
                             begin="0s"
                             dur="1s"
                             values="15; 4; 15" calcMode="linear" repeatCount="indefinite"
                    />
                    <animate attributeName="fill-opacity" from="1" to="1"
                             begin="0s"
                             dur="1s"
                             values="1;.5;1" calcMode="linear" repeatCount="indefinite"
                    />
                </circle>
                
                
                <circle cx="60" cy="15" r="9" fillOpacity="0.3">
                    <animate attributeName="r" from="9" to="9"
                             begin="0.16s"
                             dur="1s"
                             values="15; 4; 15" calcMode="linear" repeatCount="indefinite"
                    />
                    <animate attributeName="fill-opacity" from="0.5" to="0.25"
                             begin="0.16s"
                             dur="1s"
                             values="1;.5;1" calcMode="linear" repeatCount="indefinite"
                    />
                </circle>
                
                
                <circle cx="105" cy="15" r="15">
                    <animate attributeName="r" from="15" to="15"
                             begin="0.32s"
                             dur="1s"
                             values="15; 4; 15" calcMode="linear" repeatCount="indefinite"
                    />
                    <animate attributeName="fill-opacity" from="1" to="1"
                             begin="0.32s"
                             dur="1s"
                             values="1;.5;1" calcMode="linear" repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    );
}