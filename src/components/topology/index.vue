<template>
  <div class="topology-main">
    <div class="topology-left">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span :draggable="draggable(data)" @dragstart="onDrag(data)">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div class="topology-right">
      <div id="mountNode" @dragover="allowDrop" @drop="onDrop">
      </div>
    </div>
    <el-button
      type="primary"
      @click="onSave"
    >
      保存
    </el-button>
  </div>
</template>

<script>
import G6 from '@antv/g6'
let graph = null
export default {
  name: 'Index',
  components: {},
  props: {

  },
  data() {
    return {
      data: [
        {
          id: '1',
          label: '服务器',
          children: [
            {
              id: '11',
              type: 'server',
              label: '服务器1'
            }
          ]
        },
        {
          id: '2',
          label: '路由器',
          children: [
            {
              id: '21',
              type: 'router',
              label: '路由器1'
            }
          ]
        },
        {
          id: '3',
          label: '交换机',
          children: [
            {
              id: '31',
              type: 'switchboard',
              label: '交换机1'
            }
          ]
        },
        {
          id: '4',
          label: '防火墙',
          children: [
            {
              id: '41',
              type: 'firewall',
              label: '防火墙1'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      nodes: [],
      dragData: {}
    }
  },
  watch: {
  },
  mounted() {
    this.initG6()
  },
  methods: {
    initG6() {
      graph = new G6.Graph({
        container: 'mountNode', // 指定图画布的容器 id
        // 画布宽高
        width: 800,
        height: 600,
        fitView: true, // 自适应画布大小
        fitViewPadding: 20, // 图适应画布时，指定四周的留白
        modes: {
          default: [
            'drag-canvas', // 允许拖拽画布
            'zoom-canvas', // 允许缩放画布
            'drag-node', // 允许拖拽节点
            { // 点击节点创建连线
              type: 'create-edge',
              trigger: 'click',
              edgeConfig: {
                type: 'line',
                style: {
                  stroke: '#8cc6fd',
                  lineWidth: 2,
                  lineAppendWidth: true // 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
                }
              }
            }
          ]
        },
        plugins: [
          new G6.Menu({
            getContent(evt) {
              if (evt.item) {
                // const itemType = evt.item.getType()
                return `<el-button style="cursor: pointer">删除</el-button>`
              }
            },
            handleMenuClick: (target, item) => {
              graph.removeItem(item, true)
            },
            // 需要加上父级容器的 padding-left 16 与自身偏移量 10
            offsetX: 16 + 10,
            // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
            offsetY: 0,
            // 在哪些类型的元素上响应
            itemTypes: ['node', 'edge', 'canvas']
          }),
          new G6.Tooltip({
            offsetX: 10,
            offsetY: 10,
            // 允许出现 tooltip 的 item 类型
            itemTypes: ['node', 'edge'],
            // 自定义 tooltip 内容
            getContent: (e) => {
              const outDiv = document.createElement('div')
              outDiv.style.width = 'fit-content'
              // outDiv.style.padding = '0px 0px 20px 0px';
              outDiv.innerHTML = `<ul>
                                    <li>Type: ${e.item.getType()}</li>
                                    <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
                                  </ul>`
              return outDiv
            }
          }),
          new G6.ToolBar({
            position: { x: 220, y: 10 }
          })
        ],
        // 设置为true，启用 redo & undo 栈功能
        enabledStack: true,
        defaultEdge: { // 连线默认样式
          style: {
            endArrow: { // 连线箭头样式
              // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
              path: 'M 0,0 L 10,5 L 10,-5 Z',
              // 箭头的偏移量，负值代表向 x 轴正方向移动
              // d: -10,
              // v3.4.1 后支持各样式属性
              fill: '#8cc6fd',
              stroke: '#8cc6fd',
              opacity: 0.8
            }
          }
        },
        nodeStateStyles: {
          hover: { // 节点hover状态样式
            shadowColor: '#8cc6fd',
            shadowBlur: 2
          }
        },
        edgeStateStyles: {
          hover: { // 连线hover状态样式
            fill: '#1989fa',
            shadowColor: '#1989fa',
            shadowBlur: 1
          }
        }
      })
      graph.data({ nodes: [] })
      graph.render()
      graph.on('node:mouseenter', (e) => {
        graph.setItemState(e.item, 'hover', true)
      })
      graph.on('node:mouseleave', (e) => {
        graph.setItemState(e.item, 'hover', false)
      })
      graph.on('edge:mouseenter', (e) => {
        graph.setItemState(e.item, 'hover', true)
      })
      graph.on('edge:mouseleave', (e) => {
        graph.setItemState(e.item, 'hover', false)
      })
    },
    draggable(data) {
      return !data.children
    },
    onDrag(data) {
      this.dragData = data
    },
    onDrop(ev) {
      graph.addItem('node', {
        id: this.dragData.id,
        x: ev.offsetX,
        y: ev.offsetY,
        size: [50, 50], // 图片宽高
        type: 'image', // 节点类型
        img: require(`./image/${this.dragData.type}.jpeg`), // image类型节点图片
        label: this.dragData.label,
        // 裁剪图片配置
        clipCfg: {
          show: false,
          type: 'circle',
          r: 10
        }
      }, true)
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    onSave() {
      console.log(graph.save())
    }
  }
}
</script>

<style lang="scss" scoped>
  .topology-main{
    width: 100%;
    height: 100%;
    .topology-left{
      display: inline-block;
      width: 200px;
      height: 100%;
      vertical-align: top;
    }
    .topology-right{
      display: inline-block;
      width: calc(100% - 200px);
      height: 100%;
      vertical-align: top;
    }
  }
</style>
