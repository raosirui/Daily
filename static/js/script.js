// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 为所有挂起复选框添加事件监听
    const suspendCheckboxes = document.querySelectorAll('.is-suspended');
    suspendCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = this.getAttribute('data-index');
            const suspendFields = document.querySelectorAll(`.suspended-fields[data-index="${index}"]`);
            suspendFields.forEach(field => {
                field.style.display = this.checked ? 'block' : 'none';
            });
        });
        
        // 初始化时触发一次，确保正确显示
        checkbox.dispatchEvent(new Event('change'));
    });
    
    // 为所有求助复选框添加事件监听
    const helpCheckboxes = document.querySelectorAll('.is-help');
    helpCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = this.getAttribute('data-index');
            const helpFields = document.querySelectorAll(`.help-fields[data-index="${index}"]`);
            helpFields.forEach(field => {
                field.style.display = this.checked ? 'block' : 'none';
            });
        });
        
        // 初始化时触发一次，确保正确显示
        checkbox.dispatchEvent(new Event('change'));
    });
    
    // 为所有项目下拉框添加交互
    const projectComboboxes = document.querySelectorAll('.project-combobox');
    projectComboboxes.forEach(input => {
        const projectInputGroup = input.closest('.project-input-group');
        const projectDropdown = projectInputGroup.querySelector('.project-dropdown');
        const datalist = input.list;
        
        // 输入时显示下拉建议
        input.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const options = datalist.options;
            
            if (projectDropdown) {
                // 清空并重新填充项目下拉
                projectDropdown.innerHTML = '';
                
                // 过滤并添加匹配的项目
                let hasMatches = false;
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    if (option.value.toLowerCase().includes(filter)) {
                        const projectItem = document.createElement('div');
                        projectItem.className = 'project-item';
                        projectItem.textContent = option.value;
                        projectItem.addEventListener('click', function() {
                            input.value = this.textContent;
                            projectDropdown.style.display = 'none';
                            // 清除可能存在的错误提示
                            clearProjectError(input);
                        });
                        projectDropdown.appendChild(projectItem);
                        hasMatches = true;
                    }
                }
                
                // 显示或隐藏下拉框
                projectDropdown.style.display = hasMatches ? 'block' : 'none';
            }
        });
        
        // 聚焦时显示下拉建议
        input.addEventListener('focus', function() {
            if (projectDropdown && datalist.options.length > 0) {
                projectDropdown.style.display = 'block';
            }
        });
        
        // 点击外部关闭下拉框
        document.addEventListener('click', function(event) {
            if (projectDropdown && !projectInputGroup.contains(event.target)) {
                projectDropdown.style.display = 'none';
            }
        });
    });
    
    // 为删除按钮添加删除功能
    const deleteButtons = document.querySelectorAll('.btn-remove');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const transactionItem = this.closest('.transaction-item');
            transactionItem.remove();
        });
    });
    
    // 为添加按钮添加基本交互
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 简化处理
        });
    });
    
    // 为表格行添加基本的交互效果
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 0, 0, 0.02)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
    
    // 响应式调整：在小屏幕上优化表格显示
    function adjustTableForMobile() {
        const tables = document.querySelectorAll('table');
        if (window.innerWidth <= 768) {
            tables.forEach(table => {
                table.style.overflowX = 'auto';
                table.style.display = 'block';
            });
        } else {
            tables.forEach(table => {
                table.style.overflowX = 'visible';
                table.style.display = 'table';
            });
        }
    }
    
    // 初始化时调整表格
    adjustTableForMobile();
    
    // 窗口大小改变时调整表格
    window.addEventListener('resize', adjustTableForMobile);
    
    // 添加表单提交前的项目名校验
    const reportForm = document.querySelector('form[action="/submit_report"]');
    if (reportForm) {
        reportForm.addEventListener('submit', function(event) {
            // 获取所有项目输入框
            const projectInputs = document.querySelectorAll('.project-combobox');
            let hasError = false;
            
            // 遍历所有项目输入框进行校验
            projectInputs.forEach((input, index) => {
                const projectValue = input.value.trim();
                if (projectValue) {
                    // 获取当前输入框对应的datalist选项
                    const datalistId = input.getAttribute('list');
                    const datalist = document.getElementById(datalistId);
                    let isValid = false;
                    
                    // 检查项目名是否在datalist选项中
                    for (let i = 0; i < datalist.options.length; i++) {
                        if (datalist.options[i].value === projectValue) {
                            isValid = true;
                            clearProjectError(input);
                            break;
                        }
                    }
                    
                    // 如果项目名无效，显示错误提示
                    if (!isValid) {
                        showProjectError(input, `事务${index + 1}的项目名不在项目列表中，请选择有效的项目名！`);
                        hasError = true;
                    }
                } else {
                    // 如果项目名为空，清除可能存在的错误提示
                    clearProjectError(input);
                }
            });
            
            // 如果有错误，阻止表单提交
            if (hasError) {
                event.preventDefault();
                // 滚动到第一个错误的位置
                const firstError = document.querySelector('.project-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // 显示项目错误提示
    function showProjectError(input, message) {
        // 先清除可能存在的错误提示
        clearProjectError(input);
        
        // 创建错误提示元素
        const errorElement = document.createElement('div');
        errorElement.className = 'project-error text-danger small mt-1';
        errorElement.textContent = message;
        
        // 将错误提示添加到输入框下方
        input.parentNode.appendChild(errorElement);
        
        // 为输入框添加错误样式
        input.classList.add('border-danger');
    }
    
    // 清除项目错误提示
    function clearProjectError(input) {
        // 移除错误提示元素
        const existingError = input.parentNode.querySelector('.project-error');
        if (existingError) {
            existingError.remove();
        }
        
        // 移除错误样式
        input.classList.remove('border-danger');
    }
});