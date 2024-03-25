System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, Color, Component, EditBox, instantiate, Label, Node, Prefab, Sprite, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, Main;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
      Color = _cc.Color;
      Component = _cc.Component;
      EditBox = _cc.EditBox;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Sprite = _cc.Sprite;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7453byZ1VRJQ4aHZ/VmNqFd", "Main", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Button', 'Color', 'Component', 'EditBox', 'instantiate', 'Label', 'Node', 'Prefab', 'Sprite']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Main", Main = (_dec = ccclass('Main'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Prefab), _dec7 = property(Node), _dec(_class = (_class2 = class Main extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "question", _descriptor, this);

          _initializerDefineProperty(this, "question1", _descriptor2, this);

          _initializerDefineProperty(this, "question2", _descriptor3, this);

          _initializerDefineProperty(this, "question3", _descriptor4, this);

          _initializerDefineProperty(this, "itemPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "playBtn", _descriptor6, this);

          this.colorHash = {};
        }

        onLoad() {
          this.initData();
          this.initView();
        }

        onBackClick() {
          this.initView();
        }

        onQuestionClick(_, index) {
          //点击三个题目
          if (index == 1) {
            this.showQ1View();
          } else if (index == 2) {
            this.showQ2View();
          } else if (index == 3) {
            this.showQ3View();
          }
        }

        initData() {
          this.colorHash = [{
            index: 0,
            name: "红色",
            color: new Color(255, 0, 0, 255)
          }, {
            index: 1,
            name: "紫色",
            color: new Color(255, 0, 255, 255)
          }, {
            index: 2,
            name: "黄色",
            color: new Color(255, 255, 0, 255)
          }, {
            index: 3,
            name: "绿色",
            color: new Color(0, 255, 0, 255)
          }, {
            index: 4,
            name: "蓝色",
            color: new Color(0, 0, 255, 255)
          }];
        }

        initView() {
          this.question.active = true;
          this.question1.active = false;
          this.question2.active = false;
          this.question3.active = false;
        } //题目1相关


        showQ1View() {
          this.question.active = false;
          this.question1.active = true;
          var content = this.question1.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
          content.removeAllChildren();
        } //点击生成按钮


        onProduceBtnClick() {
          var content = this.question1.getChildByName("ScrollView").getChildByName("view").getChildByName("content");
          content.removeAllChildren();
          var item = instantiate(this.itemPrefab);
          var data = this.getColorData();

          for (var i = 0; i < data.length; i++) {
            var element = data[i];

            for (var j = 0; j < element.length; j++) {
              var element2 = element[j];
              var item = instantiate(this.itemPrefab);
              item.getComponent(Sprite).color = element2["color"];
              item.getChildByName("name").getComponent(Label).string = element2["name"];
              content.addChild(item);
            }
          } // for (let i = 0; i < 100; i++) {
          //     var item = instantiate(this.itemPrefab)
          //     item.getComponent(Sprite).color = new Color(0,255,0,255);
          //     content.addChild(item)
          // }

        }

        getColorData() {
          var strX = this.question1.getChildByName("inputX").getComponent(EditBox).string;
          var numX = Number(strX);
          var strY = this.question1.getChildByName("inputY").getComponent(EditBox).string;
          var numY = Number(strY);
          var width = 10;
          var heigh = 10;
          var colorNum = 5; //5种颜色

          var basePro = 20; //基本概率

          var colorHash = this.colorHash; //根据概率(权重)挑选颜色

          var pickIndex = function pickIndex(proData) {
            var num = Math.floor(Math.random() * proData[colorNum - 1]) + 1;
            var result;

            for (var index = 0; index < proData.length; index++) {
              var element = proData[index];

              if (result == null && num <= element) {
                result = index;
                break;
              }
            }

            return result;
          };

          var getFinalColor = function getFinalColor(row, column, colorData) {
            //每个点的数据结构为{index:1,name:"红色",color:new Color(255,0,0,255)}
            //index为颜色编号，name为颜色名字，color为实际颜色
            var data = {};
            var addProData = {};
            var addProCount = 0; //增加概率的颜色个数

            var addProNum = 0; //增加了的概率 

            var leftColorIndex;

            if (colorData[row] && colorData[row][column - 1]) {
              leftColorIndex = colorData[row][column - 1].index;
            }

            var topColorIndex;

            if (colorData[row - 1] && colorData[row - 1][column]) {
              topColorIndex = colorData[row - 1][column].index;
            }

            if (leftColorIndex && leftColorIndex === topColorIndex) {
              addProData[leftColorIndex] = numY;
              addProNum = numY;
              addProCount = 1;
            } else {
              if (leftColorIndex != null) {
                addProData[leftColorIndex] = numX;
                addProNum = addProNum + numX;
                addProCount = addProCount + 1;
              }

              if (topColorIndex != null) {
                addProData[topColorIndex] = numX;
                addProNum = addProNum + numX;
                addProCount = addProCount + 1;
              }
            }

            var proData = [];

            for (var i = 0; i < colorNum; i++) {
              if (addProData[i]) {
                proData[i] = Math.min(basePro + addProData[i], 100);
              } else {
                if (addProCount > 0) {
                  proData[i] = Math.max(basePro - addProNum / (colorNum - addProCount), 0);
                } else {
                  proData[i] = basePro;
                }
              }

              if (i > 0) {
                proData[i] = proData[i - 1] + proData[i];
              }
            }

            var colorIndex = pickIndex(proData);
            return colorHash[colorIndex];
          };

          var colorData = [];

          for (var row = 0; row < width; row++) {
            colorData[row] = [];

            for (var column = 0; column < heigh; column++) {
              var data = getFinalColor(row, column, colorData);
              colorData[row][column] = data;
            }
          }

          return colorData;
        } //题目2相关


        showQ2View() {
          this.question.active = false;
          this.question2.active = true;
        }

        onCheckBtnClick() {
          var a = [10, 40, 5, 280];
          var b = [234, 5, 2, 148, 23];
          var v = 42;
          var result = this.checkSum(a, b, v);
          var str = "";
          str = str + "a = [";

          for (var index = 0; index < a.length; index++) {
            var element = a[index];
            str = str + element;

            if (index != a.length - 1) {
              str = str + ",";
            }
          }

          str = str + "];\n";
          str = str + "b = [";

          for (var _index = 0; _index < b.length; _index++) {
            var _element = b[_index];
            str = str + _element;

            if (_index != b.length - 1) {
              str = str + ",";
            }
          }

          str = str + "];\n";
          str = str + "v = " + v + ";\n";
          str = str + "\n";
          str = str + "result:" + result + ";";
          this.question2.getChildByName("result").getComponent(Label).string = str;
        }

        checkSum(arrayA, arrayB, sum) {
          for (var i = 0; i < arrayA.length; i++) {
            for (var j = 0; j < arrayB.length; j++) {
              if (sum == arrayA[i] + arrayB[j]) {
                return true;
              }
            }
          }

          return false;
        } //题目3相关


        showQ3View() {
          this.question.active = false;
          this.question3.active = true;
          var anim = this.playBtn.getComponent(Animation);
          anim.play("playShow");
          this.playBtn.on(Node.EventType.TOUCH_START, () => {
            anim.play("playClick");
          });
          this.playBtn.on(Node.EventType.TOUCH_END, () => {
            anim.crossFade("playClickUp", 0.3);
          });
          this.playBtn.on(Node.EventType.TOUCH_CANCEL, () => {
            anim.crossFade("playClickUp", 0.3);
          });
        }

        start() {}

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "question", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "question1", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "question2", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "question3", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "playBtn", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class)); // Learn TypeScript:


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0fbf15e3ae7fa17478e3f536effe0f2ea6d3cbd9.js.map