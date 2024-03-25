import { _decorator, Animation, Button, Color, Component, EditBox, instantiate, Label, Node, Prefab, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property(Node)
    question: Node = null;

    @property(Node)
    question1: Node = null;

    @property(Node)
    question2: Node = null;

    @property(Node)
    question3: Node = null;

    @property(Prefab)
    itemPrefab: Prefab = null;

    @property(Node)
    playBtn: Node = null;


    private colorHash = {};

    protected onLoad(): void {
        this.initData()
        this.initView()
        
    }

    onBackClick(){
        this.initView()
    }

    onQuestionClick(_,index){
        //点击三个题目
        if (index == 1) {
            this.showQ1View()
        }else if (index == 2) {
            this.showQ2View()
        }else if (index == 3) {
            this.showQ3View()
        }
    }

    initData(){
        this.colorHash = [
            {
                index : 0,
                name : "红色",
                color : new Color(255,0,0,255)
            },
            {
                index : 1,
                name : "紫色",
                color : new Color(255,0,255,255)
            },
            {
                index : 2,
                name : "黄色",
                color : new Color(255,255,0,255)
            },
            {
                index : 3,
                name : "绿色",
                color : new Color(0,255,0,255)
            },
            {
                index : 4,
                name : "蓝色",
                color : new Color(0,0,255,255)
            },
        ]
    }

    initView() {
        this.question.active = true
        this.question1.active = false
        this.question2.active = false
        this.question3.active = false
    }

    //题目1相关

    showQ1View(){
        this.question.active = false
        this.question1.active = true
        let content = this.question1.getChildByName("ScrollView").getChildByName("view").getChildByName("content")
        content.removeAllChildren()
    }

    //点击生成按钮
    onProduceBtnClick() {
        let content = this.question1.getChildByName("ScrollView").getChildByName("view").getChildByName("content")
        content.removeAllChildren()
        var item = instantiate(this.itemPrefab)
        let data = this.getColorData();
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            for (let j = 0; j < element.length; j++) {
                const element2 = element[j];
                var item = instantiate(this.itemPrefab)
                item.getComponent(Sprite).color = element2["color"];
                item.getChildByName("name").getComponent(Label).string = element2["name"]
                content.addChild(item)
            }
            
        }

        // for (let i = 0; i < 100; i++) {
        //     var item = instantiate(this.itemPrefab)
        //     item.getComponent(Sprite).color = new Color(0,255,0,255);
        //     content.addChild(item)
        // }

    }

    getColorData(){
        let strX = this.question1.getChildByName("inputX").getComponent(EditBox).string
        const numX = Number(strX);
        let strY = this.question1.getChildByName("inputY").getComponent(EditBox).string
        const numY = Number(strY);

        const width = 10;
        const heigh = 10;
        const colorNum = 5;//5种颜色
        const basePro = 20;//基本概率
        let colorHash = this.colorHash;

        //根据概率(权重)挑选颜色
        let pickIndex = function (proData):number {
            const num = Math.floor(Math.random() * proData[colorNum-1]) + 1;
            let result;
            for (let index = 0; index < proData.length; index++) {
                const element = proData[index];
                if (result == null && num <= element) {
                    result = index
                    break
                }
            }
            return result
        }

        let getFinalColor = function (row, column, colorData) {
            //每个点的数据结构为{index:1,name:"红色",color:new Color(255,0,0,255)}
            //index为颜色编号，name为颜色名字，color为实际颜色
            let data = {};
            let addProData = {};
            let addProCount = 0;//增加概率的颜色个数
            let addProNum:number = 0;//增加了的概率 
            let leftColorIndex:number;
            if (colorData[row] && colorData[row][column-1]) {
                leftColorIndex = colorData[row][column-1].index
            }
            let topColorIndex:number;
            if (colorData[row-1] && colorData[row-1][column]) {
                topColorIndex = colorData[row-1][column].index
            }
            if (leftColorIndex && leftColorIndex === topColorIndex) {
                addProData[leftColorIndex] = numY
                addProNum = numY
                addProCount = 1
            } else {
                if (leftColorIndex != null) {
                    addProData[leftColorIndex] = numX
                    addProNum = addProNum +  numX
                    addProCount = addProCount + 1
                }
                if (topColorIndex != null) {
                    addProData[topColorIndex] = numX
                    addProNum = addProNum +  numX
                    addProCount = addProCount + 1
                }
            }
            let proData = [];
            for (let i = 0; i < colorNum; i++) {
                if (addProData[i]) {
                    proData[i] = Math.min(basePro + addProData[i], 100)
                } else {
                    if (addProCount > 0) {
                        proData[i] = Math.max(basePro - addProNum / (colorNum - addProCount), 0)
                    } else {
                        proData[i] = basePro
                    }
                }
                if (i > 0) {
                    proData[i] = proData[i-1] + proData[i]
                }
            }
            let colorIndex = pickIndex(proData)
            return colorHash[colorIndex]
        }

        let colorData = [];
        for (let row = 0; row < width; row++) {
            colorData[row] = [];
            for (let column = 0; column < heigh; column++) {
                let data = getFinalColor(row, column, colorData);
                colorData[row][column] = data;
            }
        }
        return colorData;
    }


    //题目2相关

    showQ2View(){
        this.question.active = false
        this.question2.active = true
    }

    onCheckBtnClick(){
        const a = [10,40,5,280];
        const b = [234,5,2,148,23];
        const v = 42;
        let result = this.checkSum(a, b, v);

        let str = "";
        str = str + "a = [";
        for (let index = 0; index < a.length; index++) {
            const element = a[index];
            str = str + element;
            if (index != a.length - 1) {
                str = str +",";
            }
        }
        str = str + "];\n";

        str = str + "b = [";
        for (let index = 0; index < b.length; index++) {
            const element = b[index];
            str = str + element;
            if (index != b.length - 1) {
                str = str +",";
            }
        }
        str = str + "];\n";
        str = str + "v = " + v +";\n"
        str = str + "\n"
        str = str + "result:" + result + ";"
        this.question2.getChildByName("result").getComponent(Label).string = str;

    }

    checkSum(arrayA:number[], arrayB:number[], sum:number){
        for (let i = 0; i < arrayA.length; i++) {
            for (let j = 0; j < arrayB.length; j++) {
                if (sum == arrayA[i] + arrayB[j]) {
                    return true
                }
            }            
        }
        return false
    }


    //题目3相关

    showQ3View(){
        this.question.active = false
        this.question3.active = true
        
        let anim = this.playBtn.getComponent(Animation);
        anim.play("playShow")
        this.playBtn.on(Node.EventType.TOUCH_START,()=>{
            anim.play("playClick")

        })
        this.playBtn.on(Node.EventType.TOUCH_END,()=>{
            anim.crossFade("playClickUp", 0.3)

        })
        this.playBtn.on(Node.EventType.TOUCH_CANCEL,()=>{
            anim.crossFade("playClickUp", 0.3)
        })
    }

    start() {

    }



    update(deltaTime: number) {
        
    }

}


// Learn TypeScript: