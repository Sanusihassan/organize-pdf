import { useSelector } from "react-redux";
import { ToolState } from "../src/store";
import { CiLock } from "react-icons/ci";
import { VscPreview } from "react-icons/vsc";
import { TbDragDrop } from "react-icons/tb";

export const Features = ({ features }: {
    features: { title: string; description: string }[];
}) => {
    const stateShowTool = useSelector(
        (state: { tool: ToolState }) => state.tool.showTool
    );
    const icons = [TbDragDrop, VscPreview, CiLock]
    return (
        <div className={`features${stateShowTool ? "" : " d-none"}`}>
            {features.map(({ title, description }, i) => {
                const Icon = icons[i];
                return (
                    <div className="feature">
                        <Icon className="feature-icon" />
                        <div className="title">{title}</div>
                        <p className="description">{description}</p>
                    </div>
                )
            })}
        </div>
    )
}