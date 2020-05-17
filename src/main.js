const simplifyUrl = (url) =>{
    url = url.replace("https://","").replace("http://","").replace("www.","");
    return url.replace(/\/.*/,'');
}
const renderList = () => {
    // 清空 + 按钮之前的所有li
    $siteList.find('li:not(.last)').remove();
    // 渲染数据
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-baseline-close-px"></use>
                        </svg>
                    </div>
                </div>
            </li>`).insertBefore($lastLi);

        $li.on('click', ()=>{
            window.open(node.url);
        })

        $li.on('click', '.close' ,(e) => {
            console.log("阻止x图标的点击事件向外传递");
            e.stopPropagation();
            hashMap.splice(index, 1);
            renderList();
        })
    })
}
// 全局变量
const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');

const x = window.localStorage.getItem("hashMap");
const xObject = JSON.parse(x);
let hashMap = xObject || [
    { logo: 'A',logoType: 'text', url:'https://www.acfun.cn'},
    { logo: 'B',logoType:'image', url: 'https://www.bilibili.com'},
    { logo: 'Z', logoType: 'text', url: "https://www.zhihu.com"}
]

renderList();

$(".addButton").on('click', () => {
    let url = window.prompt('请问你要添加的网址是什么？');
    if (url.indexOf('http') !== 0){
        url = "http://" + url;
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    renderList();
})

// 监听用户关闭游览器窗口的函数
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    window.localStorage.setItem("hashMap",string);
}

// 键盘事件监听
document.addEventListener('keypress',(e)=>{
    const {key} = e;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url);
        }
    }
})




































