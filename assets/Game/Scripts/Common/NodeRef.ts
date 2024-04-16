import { _decorator, CCString, Component, find, Node } from 'cc';
import { Validator } from '../../../Library/Validator';
import { Debug } from '../Debug';

const { ccclass, property, executionOrder } = _decorator;


@ccclass('NodeRef')
@executionOrder(0)
export class NodeRef extends Component
{
    @property(CCString)
    public id: string;

    @property(CCString)
    public type: string;

    protected nodes = new Map<string, Node>();
    protected visuals = new Map<string, Component>();
    protected visualsInChildren = new Map<string, Component[]>();

    protected onLoad(): void
    {
    }

    protected onEnable(): void
    {
    }

    protected onDisable(): void
    {
    }

    protected onDestroy(): void
    {
    }

    public GetNode(nodePath: string, callback?: (node: Node) => void): Node | null
    {
        if (Validator.IsObjectIllegal(nodePath, "nodePath")) return null;
        if (this.nodes.has(nodePath))
            return this.nodes.get(nodePath);
        else
        {
            var node = find(nodePath, this.node);
            if (Validator.IsObjectIllegal(node, `node from ${nodePath}`))
                return null;
            else
            {
                this.nodes.set(nodePath, node);
                if (!Validator.IsObjectEmpty(callback)) callback(node);
                return node;
            }
        }
    }

    public GetVisual<T extends Component>(nodePath: string, type: any, callback?: (component: T) => void): T | null
    {
        if (Validator.IsObjectIllegal(nodePath, "nodePath")) return null;
        if (Validator.IsObjectIllegal(type, "type")) return null;
        var key = `${nodePath}/${type}`;
        var component: T;
        if (this.visuals.has(key))
        {
            component = this.visuals.get(key) as T;
            if (component == null)
                Debug.Error(`路径为${nodePath}的组件类型转换失败`);
            return component;
        }
        else
        {
            var node = this.GetNode(nodePath);
            if (Validator.IsObjectEmpty(node)) return null;
            component = node.getComponent(type);
            if (Validator.IsObjectEmpty(component))
            {
                Debug.Error(`节点${node.name}上未找到组件${type}`);
                return null;
            }
            this.visuals.set(key, component);
            if (!Validator.IsObjectEmpty(callback)) callback(component);
            return component;
        }
    }
    public GetVisualsInChildren<T extends Component>(nodePath: string, type: any, callback?: (components: T[]) => void): T[] | null
    {
        if (Validator.IsObjectIllegal(nodePath, "nodePath")) return null;
        if (Validator.IsObjectIllegal(type, "type")) return null;
        var key = `${nodePath}/${type}`;
        var components: T[];
        if (this.visualsInChildren.has(key))
        {
            components = this.visualsInChildren.get(key) as T[];
            if (components == null)
                Debug.Error(`路径为${nodePath}的组件类型转换失败`);
            return components;
        }
        else
        {
            var node = this.GetNode(nodePath);
            if (Validator.IsObjectEmpty(node)) return null;
            components = node.getComponentsInChildren(type);
            if (Validator.IsObjectEmpty(components))
            {
                Debug.Error(`${node.name}子节点上未找到组件${type}`);
                return null;
            }
            this.visualsInChildren.set(key, components);
            if (!Validator.IsObjectEmpty(callback)) callback(components);
            return components;
        }
    }
}