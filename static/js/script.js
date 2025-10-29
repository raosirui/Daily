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
    
});