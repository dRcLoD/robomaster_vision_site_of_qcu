# 如何使用 Linux

我们这里不会给你讲得很学院派，我们只会给你讲够用的东西。

想学会使用 Linux，只需要经历两个任务：1. 在电脑的虚拟机中安装 Linux；2. 在 Linux 上安装搜狗输入法。

## 任务一 · 在虚拟机里装一个 Ubuntu 22.04

### 1. 装虚拟机软件

二选一：VMware 或 VirtualBox。下面以 VMware 为例，因为我只会 VMware，你想用 VirtualBox 也行。

### 2. 下载镜像

可以去官网下载，但是别去官网下（很慢），用国内镜像站：

- 清华 TUNA：https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/22.04/
- 阿里云：https://mirrors.aliyun.com/ubuntu-releases/22.04/
- MSDN：https://next.itellyou.cn/Original/#cbp=Product?ID=deb4715d-5e52-ea11-bd34-b025aa28351d

进去找 `ubuntu-22.04.5-desktop-amd64.iso`，5 GB 左右，认准 `desktop-amd64`。

### 3. 建虚拟机

新建虚拟机 → 典型 → **稍后安装操作系统**（选这个，不然它会自作主张替你装）→ 客户机系统选 Linux / Ubuntu 64 位。资源按下面给：

| 项 | 给多少 | 为什么 |
| --- | --- | --- |
| 内存 | 4~8 GB | 宿主机 16 GB 就给 8 GB，8 GB 就给 4 GB，别给满 |
| 处理器 | 2~4 核 | 同理，留一半给 Windows |
| 磁盘 | 60 GB | 后面要装 OpenCV、编译代码，20 GB 早晚不够；选"将虚拟磁盘存储为单个文件" |
| 网络 | NAT | 默认就行，能上网 |

### 4. 安装系统

挂上 ISO（虚拟机设置 → CD/DVD → 使用 ISO 映像文件，文件就选前面下载的那个），开机，然后跟着向导走。需要你自己做决定的只有这几处：

- **语言**：选 **English**。理由很实在：报错原样搜得到，路径里没有中文，后面敲命令能少一半的坑。中文输入怎么办是任务二的事。
- **更新和其他软件**：不要勾"安装时下载更新"。默认源在国外，勾了只会让你多等半小时。
- **安装类型**：选"清除整个磁盘并安装"——这是虚拟机的虚拟磁盘，随便擦，碰不到你的 Windows。
- 用户名/密码：起个简单的，密码别忘，`sudo` 要天天用；可以勾"自动登录"，省事。
- 时区：Shanghai。

装完会提示"请移除安装介质并回车"——虚拟机里直接按回车就行，那个 ISO 是虚拟的。

### 5. 装完先做这两件事

打开终端，快捷键 `Ctrl+Alt+T`（这四个键以后你会天天按），依次来：

**① 装虚拟机增强工具**（剪贴板互通、分辨率自适应、能拖文件）

```bash
sudo apt update
sudo apt install -y open-vm-tools open-vm-tools-desktop
```

装完重启一次，屏幕会自动铺满窗口，Windows 里复制的东西也能直接粘进来。VirtualBox 的用户对应装 `virtualbox-guest-utils virtualbox-guest-x11`。

**② 换国内软件源**

图形界面：「软件和更新」→「Ubuntu 软件」→ 下载自 → 其他站点 → 中国 → `mirrors.tuna.tsinghua.edu.cn`。

懒得点也行，Ubuntu 22.04 的源就是 `/etc/apt/sources.list` 这个文本文件，两行命令改掉（如果你的源地址是 `cn.archive.ubuntu.com`，把下面的域名照着改一下）：

```bash
sudo sed -i 's|//archive.ubuntu.com|//mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo sed -i 's|//security.ubuntu.com|//mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update
```

到这一步，任务一完成。

## 任务二 · 在 Linux 上装搜狗输入法

这个任务比第一个重要——它逼你搞清楚 Linux 上最容易让人破防的两件事：**依赖**和**环境变量**。

先理解一层结构，能省你一小时：

> Linux 打中文是两层的：上层是输入法框架（fcitx 或 ibus），下层是输入法引擎（搜狗拼音）。Ubuntu 默认装的是 ibus，而搜狗是个 fcitx 引擎。所以你要做的不是"装一个软件"，而是"装 fcitx 框架 → 把搜狗挂上去 → 告诉系统以后用 fcitx"。

### 1. 装 fcitx 框架

```bash
sudo apt update
sudo apt install -y fcitx fcitx-config-gtk fcitx-frontend-gtk3 fcitx-frontend-qt5
```

### 2. 装搜狗官方 deb

去官网 https://shurufa.sogou.com/linux 下载，得到一个 `sogoupinyin_4.2.1.145_amd64.deb` 这样的文件（版本号会更新的，认准 `amd64.deb`）。然后：

```bash
cd ~/Downloads        # 中文系统里是 ~/下载
sudo dpkg -i sogoupinyin_*_amd64.deb
```

这里大概率会报错，说什么"依赖关系问题，仍将不予理会"。别慌，这是入门 Linux 的第一课：

- `dpkg` 只管把包装上，**不负责装依赖**，所以它经常抱怨；
- `apt` 会自动解决依赖。

所以紧接着：

```bash
sudo apt -f install -y
```

`-f` 就是"修复依赖"，它会把搜狗缺的那几个库自动补上。如果它说要把 sogoupinyin 卸掉，那是真的冲突，跳到最后一节。

### 3. 告诉系统：以后用 fcitx

```bash
im-config -n fcitx
```

图形界面等价操作：「语言支持」→ 键盘输入法系统 → fcitx。第一次打开「语言支持」会提示补装语言包，装上就行。

### 4. 设置环境变量

这一步是告诉 GTK 程序、Qt 程序、X 程序："中文输入交给 fcitx"：

```bash
sudo sh -c 'printf "GTK_IM_MODULE=fcitx\nQT_IM_MODULE=fcitx\nXMODIFIERS=@im=fcitx\n" >> /etc/environment'
```

环境变量改完不会立刻生效，要重新登录一次。

### 5. 注销重登，并切到 Xorg

右上角 → 电源/用户 → Log Out，回到登录界面。

**先别急着输密码！** 看登录界面右下角有个齿轮图标，点开，选 **Ubuntu on Xorg**，再登录。

为什么：22.04 默认用 Wayland 显示协议，而搜狗用的 fcitx4 在 Wayland 下经常半死不活——终端里能打中文，浏览器里打不出来，或者干脆不弹候选框。Xorg 才是 fcitx4 被正经支持的组合。

### 6. 验收

登录之后：

- 按 `Ctrl+空格`（fcitx 默认切换键）切到搜狗拼音，随便打个字，候选框该出来了；
- 想调顺序、加输入法：终端里运行 `fcitx-configtool`；
- 还是不弹中文：注销重登一次（不是重启整个系统），再在终端里 `env | grep IM_MODULE` 确认三行都有输出。

验收标准就一条：**在浏览器地址栏里也能打中文**。能，任务二完成。

## 装不上怎么办

搜狗在 22.04 上偶尔会因为依赖打架装不干净。折腾超过一小时就退一步，用系统同源的 fcitx5：

```bash
sudo apt install -y fcitx5 fcitx5-chinese-addons fcitx5-config-qt
im-config -n fcitx5
```

注销重登，它自带「拼音」输入法，够你写中文注释和聊天。

## 几条常识

`/` 是根目录，你的东西都在 `/home/你的用户名`；`sudo` 就是"以管理员身份运行"；`Ctrl+C` 在终端里是打断。
