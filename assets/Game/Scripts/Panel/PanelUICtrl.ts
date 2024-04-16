import { _decorator, Component, Label } from "cc";
import { NodeRef } from "../Common/NodeRef";
import { TimeAlgorithm } from "../../../Library/Time/TimeAlgorithm";

const { ccclass } = _decorator;

@ccclass('PanelUICtrl')
export class PanelUICtrl extends NodeRef
{
    private ageLabel: Label;
    protected onLoad(): void
    {
        this.ageLabel = this.GetVisual("ScrollView/view/content/item/Value", Label);
    }
    protected start(): void
    {
        var age: number = TimeAlgorithm.CalculateYearsAndDays(1998, 6, 19, true);
        this.ageLabel.string = age.toString();
    }
}