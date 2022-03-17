import Icons from "./sprite.svg";

export const Icon = ({ name, sizeW, sizeH, className, sizeWV = sizeW, sizeHV = sizeH}) => {
    return (
        <svg className={className} width={sizeW} height={sizeH} viewBox={`0 0 ${sizeWV} ${sizeHV}`} role={"presentation"}>
            <use href={Icons + `#${name}`} />
        </svg>
    )
}