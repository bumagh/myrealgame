import { _decorator, Component, CCString, assetManager, director } from "cc";
import { Debug } from "./Debug";

const { ccclass, property, executionOrder } = _decorator;

@ccclass('Architecture')
@executionOrder(-999)
export class Architecture extends Component
{
    public static instance: Architecture;
    @property([CCString])
    private consoleIgnores: string[] = [];
    arcadeScenePreloaded: boolean;
    prefabsCreated: boolean;
    bundles: any;
    bundleNames: any;

    protected onLoad(): void
    {
        Architecture.instance = this;
        this.InitEventManager();
        this.InitRemoteImageManager();
        this.InitWebSocketManager();
        this.InitNetworkAPIManager();
        this.InitPipelines();
        // this.LoadBundles();


    }
    protected onDestroy(): void
    {

    }

    protected start(): void
    {

    }
    private InitRemoteImageManager(): void
    {

    }
    public AreBundlesLoaded(): boolean
    {
        return this.bundleNames.length == this.bundles.size;
    }
    private LoadBundles(): void
    {
        for (let i = 0; i < this.bundleNames.length; i++)
        {
            const bundleName = this.bundleNames[i];
            assetManager.loadBundle(bundleName, (err, bundle) =>
            {
                Architecture.instance.bundles.set(bundleName, bundle);
                if (Architecture.instance.AreBundlesLoaded())
                {
                    Architecture.instance.CreatePrefabs();
                    this.PreloadArcadeScene();
                    this.PreloadGameScene();
                }
            });
        }
    }
    private PreloadArcadeScene(): void
    {
        director.preloadScene("Arcade", (error, scene) =>
        {
            if (error)
                Debug.Error(error);
            else
                Debug.Log("Arcade 场景预加载完成");
            Architecture.instance.arcadeScenePreloaded = true;
        });
    }
    private PreloadGameScene(): void
    {
        director.preloadScene("Game", (error, scene) =>
        {
            if (error)
                Debug.Error(error);
            else
                Debug.Log("Game 场景预加载完成");
            Architecture.instance.arcadeScenePreloaded = true;
        });
    }
    /**
   * 大厅场景加载时，加载budle里的预制体
   */
    private CreatePrefabs(): void
    {
        this.CreatePrefabFromBundle("Common", "CommonAudioController");
        this.prefabsCreated = true;
    }
    /**
* 从bundle中加载prefab，并生成节点
*/
    private CreatePrefabFromBundle(bundleName: string, prefabPath: string, parentNode: Node = null): void
    {
        // if (Validator.IsStringIllegal(bundleName, "bundleName")) return;
        // if (Validator.IsStringIllegal(prefabPath, "prefabPath")) return;
        // var bundle = this.bundles.get(bundleName);
        // if (Validator.IsObjectIllegal(bundle, "bundle")) return;
        // bundle.load(prefabPath, Prefab, function (err, prefab)
        // {
        //     let newNode = instantiate(prefab);
        //     if (parentNode == null)
        //         parentNode = director.getScene();
        //     parentNode.addChild(newNode);
        // });
    }

    private InitEventManager(): void
    {
    }

    private InitWebSocketManager(): void
    {


    }

    private InitNetworkAPIManager(): void
    {

    }

    private InitPipelines(): void
    {

    }

    public BackToScene(sceneName: string)
    {
        Debug.Log(sceneName);
        director.loadScene(sceneName, (error, scene) =>
        {
            if (error)
                Debug.Error(error);
        });
    }
}