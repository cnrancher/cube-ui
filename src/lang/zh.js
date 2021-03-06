import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
export default {
  zh: {
    ...elementZhLocale,
    server: {
      sessionTimeout: '会话超时，请重新登录'
    },
    error: {
      required: '{0}不能为空'
    },
    placeholder: {
      input: '请输入{0}'
    },
    action: {
      confirm: '确定',
      cancel: '取消',
      login: '登录',
      logout: '登出'
    },
    entity: {
      nav: {
        overview: '系统概览',
        infra: '基础设施'
      },
      user: {
        username: '用户名',
        password: '密码'
      }
    },
    message: {
      loginError: '登录失败：检查凭据，或者您的帐户可能无权登录。'
    },
    page: {
      login: {
        title: '欢迎使用'
      },
      overview: {
        statusTitle: '服务状态',
        resourceUsageTitle: '资源使用',
        cpu: 'CPU',
        memory: 'Memory',
        pods: 'Pods',
        etcd: 'Etcd',
        scheduler: 'Scheduler',
        controllerManager: 'Controller Manager',
        subtitle: '已用{total}中的{used}'
      },
      infra: {
      }
    }
  }
}
