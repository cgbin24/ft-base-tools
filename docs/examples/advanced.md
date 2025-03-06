# 高级示例

本页面提供了一些高级的使用示例，展示如何在实际项目中组合使用 ft-base-tools 的多个功能。

## 数据处理与展示

### 表格数据处理

下面的示例展示了如何处理和格式化表格数据：

```javascript
import { 
  arrayToObject, 
  formatDate, 
  formatMoney, 
  formatPercent 
} from 'ft-base-tools';

// 原始数据
const salesData = [
  { id: 1, product: '产品A', amount: 12500, date: '2025-01-15', growth: 0.23 },
  { id: 2, product: '产品B', amount: 8300, date: '2025-01-16', growth: -0.05 },
  { id: 3, product: '产品C', amount: 15800, date: '2025-01-17', growth: 0.12 },
  { id: 4, product: '产品D', amount: 6200, date: '2025-01-18', growth: 0.08 }
];

// 格式化数据
const formattedData = salesData.map(item => ({
  ...item,
  formattedAmount: formatMoney(item.amount),
  formattedDate: formatDate(item.date, 'YYYY年MM月DD日'),
  formattedGrowth: formatPercent(item.growth),
  status: item.growth >= 0 ? '增长' : '下降'
}));

console.log(formattedData);
/*
[
  {
    id: 1,
    product: '产品A',
    amount: 12500,
    date: '2025-01-15',
    growth: 0.23,
    formattedAmount: '¥12,500.00',
    formattedDate: '2025年01月15日',
    formattedGrowth: '23.00%',
    status: '增长'
  },
  ...
]
*/

// 转换为以 ID 为键的对象
const salesDataMap = arrayToObject(formattedData, item => item.id);
console.log(salesDataMap);
/*
{
  1: { id: 1, product: '产品A', ... },
  2: { id: 2, product: '产品B', ... },
  ...
}
*/
```

### 数据统计与分析

```javascript
import { 
  arrayChunk, 
  add, 
  multiply, 
  formatMoney, 
  formatPercent 
} from 'ft-base-tools';

// 原始销售数据
const monthlySales = [
  { month: '1月', amount: 12500 },
  { month: '2月', amount: 8300 },
  { month: '3月', amount: 15800 },
  { month: '4月', amount: 6200 },
  { month: '5月', amount: 9400 },
  { month: '6月', amount: 11200 },
  { month: '7月', amount: 13500 },
  { month: '8月', amount: 14700 },
  { month: '9月', amount: 10800 },
  { month: '10月', amount: 9200 },
  { month: '11月', amount: 12100 },
  { month: '12月', amount: 16500 }
];

// 按季度分组
const quarterSales = arrayChunk(monthlySales, 3);

// 计算每个季度的总销售额
const quarterTotals = quarterSales.map((quarter, index) => {
  const totalAmount = quarter.reduce((sum, month) => add(sum, month.amount), 0);
  return {
    quarter: `Q${index + 1}`,
    months: quarter.map(m => m.month).join('、'),
    totalAmount,
    formattedAmount: formatMoney(totalAmount)
  };
});

console.log(quarterTotals);
/*
[
  {
    quarter: 'Q1',
    months: '1月、2月、3月',
    totalAmount: 36600,
    formattedAmount: '¥36,600.00'
  },
  ...
]
*/

// 计算年度总销售额
const yearTotal = monthlySales.reduce((sum, month) => add(sum, month.amount), 0);
console.log(`年度总销售额: ${formatMoney(yearTotal)}`);

// 计算每个季度占全年的百分比
const quarterPercentages = quarterTotals.map(quarter => ({
  ...quarter,
  percentage: divide(quarter.totalAmount, yearTotal),
  formattedPercentage: formatPercent(divide(quarter.totalAmount, yearTotal))
}));

console.log(quarterPercentages);
/*
[
  {
    quarter: 'Q1',
    months: '1月、2月、3月',
    totalAmount: 36600,
    formattedAmount: '¥36,600.00',
    percentage: 0.2608,
    formattedPercentage: '26.08%'
  },
  ...
]
*/
```

## 表单处理

### 表单验证

```javascript
import { 
  isEmail, 
  isPhoneNumber, 
  isIDCard, 
  formatPhoneNumber 
} from 'ft-base-tools';

// 表单数据
const formData = {
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13812345678',
  idCard: '110101199001011234'
};

// 验证函数
function validateForm(data) {
  const errors = {};
  
  // 验证姓名
  if (!data.name || data.name.length < 2) {
    errors.name = '姓名不能为空且长度不能少于2个字符';
  }
  
  // 验证邮箱
  if (!isEmail(data.email)) {
    errors.email = '请输入有效的邮箱地址';
  }
  
  // 验证手机号
  if (!isPhoneNumber(data.phone)) {
    errors.phone = '请输入有效的手机号码';
  }
  
  // 验证身份证
  if (!isIDCard(data.idCard)) {
    errors.idCard = '请输入有效的身份证号码';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// 验证表单
const validation = validateForm(formData);
console.log(validation);
/*
{
  isValid: true,
  errors: {}
}
*/

// 格式化表单数据
if (validation.isValid) {
  const formattedData = {
    ...formData,
    phone: formatPhoneNumber(formData.phone)
  };
  console.log(formattedData);
  /*
  {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '138 1234 5678',
    idCard: '110101199001011234'
  }
  */
}
```

### 动态表单

```javascript
import { 
  on, 
  off, 
  $, 
  $$, 
  formatMoney, 
  formatNumber 
} from 'ft-base-tools';

// 假设 HTML 中有以下结构
/*
<form id="orderForm">
  <div class="product-item">
    <input type="text" class="product-name" value="产品A">
    <input type="number" class="product-price" value="100">
    <input type="number" class="product-quantity" value="2">
    <span class="product-total">¥200.00</span>
    <button type="button" class="remove-product">删除</button>
  </div>
  <button type="button" id="addProduct">添加产品</button>
  <div>
    <span>总计：</span>
    <span id="orderTotal">¥200.00</span>
  </div>
  <button type="submit">提交订单</button>
</form>
*/

// 计算单个产品总价
function calculateProductTotal(priceInput, quantityInput, totalElement) {
  const price = parseFloat(priceInput.value) || 0;
  const quantity = parseInt(quantityInput.value) || 0;
  const total = multiply(price, quantity);
  totalElement.textContent = formatMoney(total);
  return total;
}

// 计算订单总价
function calculateOrderTotal() {
  const productItems = $$('.product-item');
  let orderTotal = 0;
  
  productItems.forEach(item => {
    const priceInput = item.querySelector('.product-price');
    const quantityInput = item.querySelector('.product-quantity');
    const totalElement = item.querySelector('.product-total');
    
    const productTotal = calculateProductTotal(priceInput, quantityInput, totalElement);
    orderTotal = add(orderTotal, productTotal);
  });
  
  $('#orderTotal').textContent = formatMoney(orderTotal);
}

// 添加产品
function addProduct() {
  const productItem = document.createElement('div');
  productItem.className = 'product-item';
  productItem.innerHTML = `
    <input type="text" class="product-name" value="新产品">
    <input type="number" class="product-price" value="0">
    <input type="number" class="product-quantity" value="1">
    <span class="product-total">¥0.00</span>
    <button type="button" class="remove-product">删除</button>
  `;
  
  const addButton = $('#addProduct');
  addButton.parentNode.insertBefore(productItem, addButton);
  
  // 绑定事件
  const priceInput = productItem.querySelector('.product-price');
  const quantityInput = productItem.querySelector('.product-quantity');
  const totalElement = productItem.querySelector('.product-total');
  const removeButton = productItem.querySelector('.remove-product');
  
  on(priceInput, 'input', () => {
    calculateProductTotal(priceInput, quantityInput, totalElement);
    calculateOrderTotal();
  });
  
  on(quantityInput, 'input', () => {
    calculateProductTotal(priceInput, quantityInput, totalElement);
    calculateOrderTotal();
  });
  
  on(removeButton, 'click', () => {
    productItem.remove();
    calculateOrderTotal();
  });
  
  calculateOrderTotal();
}

// 初始化
function init() {
  // 绑定添加产品按钮事件
  on($('#addProduct'), 'click', addProduct);
  
  // 绑定现有产品的事件
  $$('.product-item').forEach(item => {
    const priceInput = item.querySelector('.product-price');
    const quantityInput = item.querySelector('.product-quantity');
    const totalElement = item.querySelector('.product-total');
    const removeButton = item.querySelector('.remove-product');
    
    on(priceInput, 'input', () => {
      calculateProductTotal(priceInput, quantityInput, totalElement);
      calculateOrderTotal();
    });
    
    on(quantityInput, 'input', () => {
      calculateProductTotal(priceInput, quantityInput, totalElement);
      calculateOrderTotal();
    });
    
    on(removeButton, 'click', () => {
      item.remove();
      calculateOrderTotal();
    });
  });
  
  // 绑定表单提交事件
  on($('#orderForm'), 'submit', (e) => {
    e.preventDefault();
    
    // 收集表单数据
    const products = [];
    $$('.product-item').forEach(item => {
      products.push({
        name: item.querySelector('.product-name').value,
        price: parseFloat(item.querySelector('.product-price').value) || 0,
        quantity: parseInt(item.querySelector('.product-quantity').value) || 0
      });
    });
    
    console.log('提交订单数据:', products);
    // 这里可以发送 AJAX 请求提交订单
  });
  
  // 初始计算总价
  calculateOrderTotal();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
```

## 数据可视化

### 图表数据处理

```javascript
import { 
  formatDate, 
  formatMoney, 
  formatPercent, 
  arrayChunk 
} from 'ft-base-tools';

// 假设我们有一年的销售数据
const salesData = [
  { date: '2025-01-15', amount: 12500 },
  { date: '2025-02-15', amount: 8300 },
  { date: '2025-03-15', amount: 15800 },
  { date: '2025-04-15', amount: 6200 },
  { date: '2025-05-15', amount: 9400 },
  { date: '2025-06-15', amount: 11200 },
  { date: '2025-07-15', amount: 13500 },
  { date: '2025-08-15', amount: 14700 },
  { date: '2025-09-15', amount: 10800 },
  { date: '2025-10-15', amount: 9200 },
  { date: '2025-11-15', amount: 12100 },
  { date: '2025-12-15', amount: 16500 }
];

// 为图表准备数据
function prepareChartData(data) {
  // 格式化日期和金额
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date, 'YYYY年MM月'),
    formattedAmount: formatMoney(item.amount)
  }));
  
  // 提取图表所需的数据
  const labels = formattedData.map(item => item.formattedDate);
  const values = formattedData.map(item => item.amount);
  
  // 计算环比增长率
  const growthRates = values.map((value, index) => {
    if (index === 0) return 0;
    const prevValue = values[index - 1];
    return prevValue === 0 ? 0 : (value - prevValue) / prevValue;
  });
  
  // 按季度分组
  const quarterData = arrayChunk(formattedData, 3);
  const quarterLabels = ['第一季度', '第二季度', '第三季度', '第四季度'];
  const quarterValues = quarterData.map(quarter => 
    quarter.reduce((sum, item) => sum + item.amount, 0)
  );
  
  return {
    monthly: {
      labels,
      values,
      formattedValues: formattedData.map(item => item.formattedAmount),
      growthRates,
      formattedGrowthRates: growthRates.map(rate => formatPercent(rate))
    },
    quarterly: {
      labels: quarterLabels,
      values: quarterValues,
      formattedValues: quarterValues.map(value => formatMoney(value))
    }
  };
}

// 准备图表数据
const chartData = prepareChartData(salesData);
console.log(chartData);

// 使用图表库绘制图表（这里以 Chart.js 为例）
/*
// 月度销售额图表
new Chart(document.getElementById('monthlySalesChart'), {
  type: 'bar',
  data: {
    labels: chartData.monthly.labels,
    datasets: [{
      label: '月度销售额',
      data: chartData.monthly.values,
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return chartData.monthly.formattedValues[context.dataIndex];
          }
        }
      }
    }
  }
});

// 季度销售额图表
new Chart(document.getElementById('quarterlySalesChart'), {
  type: 'pie',
  data: {
    labels: chartData.quarterly.labels,
    datasets: [{
      data: chartData.quarterly.values,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return chartData.quarterly.formattedValues[context.dataIndex];
          }
        }
      }
    }
  }
});
*/
```

## 实用组合

### 文件上传与处理

```javascript
import { 
  formatFileSize, 
  formatDate, 
  request, 
  on, 
  $ 
} from 'ft-base-tools';

// 假设 HTML 中有以下结构
/*
<div id="fileUploader">
  <input type="file" id="fileInput" multiple>
  <button id="uploadButton">上传文件</button>
  <div id="fileList"></div>
</div>
*/

// 文件列表
let files = [];

// 初始化文件上传器
function initFileUploader() {
  const fileInput = $('#fileInput');
  const uploadButton = $('#uploadButton');
  const fileListElement = $('#fileList');
  
  // 监听文件选择
  on(fileInput, 'change', (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // 处理文件信息
    files = selectedFiles.map(file => ({
      file,
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      formattedSize: formatFileSize(file.size),
      type: file.type,
      lastModified: new Date(file.lastModified),
      formattedLastModified: formatDate(file.lastModified, 'YYYY-MM-DD HH:mm:ss')
    }));
    
    // 渲染文件列表
    renderFileList();
  });
  
  // 监听上传按钮点击
  on(uploadButton, 'click', () => {
    uploadFiles();
  });
  
  // 渲染文件列表
  function renderFileList() {
    fileListElement.innerHTML = '';
    
    files.forEach(fileInfo => {
      const fileElement = document.createElement('div');
      fileElement.className = 'file-item';
      fileElement.innerHTML = `
        <div class="file-name">${fileInfo.name}</div>
        <div class="file-size">${fileInfo.formattedSize}</div>
        <div class="file-date">${fileInfo.formattedLastModified}</div>
        <button class="remove-file" data-id="${fileInfo.id}">删除</button>
      `;
      
      fileListElement.appendChild(fileElement);
      
      // 绑定删除按钮事件
      const removeButton = fileElement.querySelector('.remove-file');
      on(removeButton, 'click', () => {
        files = files.filter(f => f.id !== fileInfo.id);
        renderFileList();
      });
    });
  }
  
  // 上传文件
  function uploadFiles() {
    if (files.length === 0) {
      alert('请先选择文件');
      return;
    }
    
    // 创建 FormData
    const formData = new FormData();
    files.forEach(fileInfo => {
      formData.append('files', fileInfo.file);
    });
    
    // 发送上传请求
    request('https://api.example.com/upload', {
      method: 'POST',
      data: formData,
      headers: {
        // FormData 不需要设置 Content-Type，浏览器会自动设置
      }
    })
      .then(response => {
        console.log('上传成功:', response);
        alert('文件上传成功');
        
        // 清空文件列表
        files = [];
        renderFileList();
        fileInput.value = '';
      })
      .catch(error => {
        console.error('上传失败:', error);
        alert('文件上传失败');
      });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initFileUploader);
```

### 数据导出

```javascript
import { 
  formatDate, 
  formatMoney, 
  formatPercent 
} from 'ft-base-tools';

// 假设我们有一些销售数据
const salesData = [
  { id: 1, product: '产品A', amount: 12500, date: '2025-01-15', growth: 0.23 },
  { id: 2, product: '产品B', amount: 8300, date: '2025-01-16', growth: -0.05 },
  { id: 3, product: '产品C', amount: 15800, date: '2025-01-17', growth: 0.12 },
  { id: 4, product: '产品D', amount: 6200, date: '2025-01-18', growth: 0.08 }
];

// 导出为 CSV
function exportToCSV(data, filename = 'export.csv') {
  // 格式化数据
  const formattedData = data.map(item => ({
    ID: item.id,
    产品名称: item.product,
    销售金额: formatMoney(item.amount),
    销售日期: formatDate(item.date, 'YYYY-MM-DD'),
    增长率: formatPercent(item.growth)
  }));
  
  // 获取表头
  const headers = Object.keys(formattedData[0]);
  
  // 创建 CSV 内容
  let csvContent = headers.join(',') + '\n';
  
  formattedData.forEach(item => {
    const row = headers.map(header => {
      // 处理包含逗号的字段
      const cell = item[header].toString();
      return cell.includes(',') ? `"${cell}"` : cell;
    });
    csvContent += row.join(',') + '\n';
  });
  
  // 创建 Blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // 创建下载链接
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // 添加到文档并触发点击
  document.body.appendChild(link);
  link.click();
  
  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 导出为 Excel (XLSX)
function exportToExcel(data, filename = 'export.xlsx') {
  // 注意：这需要引入额外的库，如 SheetJS (xlsx)
  // 这里只是示例代码
  
  // 格式化数据
  const formattedData = data.map(item => ({
    ID: item.id,
    产品名称: item.product,
    销售金额: formatMoney(item.amount),
    销售日期: formatDate(item.date, 'YYYY-MM-DD'),
    增长率: formatPercent(item.growth)
  }));
  
  // 使用 SheetJS 创建工作簿
  /*
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '销售数据');
  
  // 导出文件
  XLSX.writeFile(workbook, filename);
  */
  
  console.log('导出 Excel 数据:', formattedData);
}

// 使用示例
// exportToCSV(salesData, '销售数据.csv');
// exportToExcel(salesData, '销售数据.xlsx');
``` 