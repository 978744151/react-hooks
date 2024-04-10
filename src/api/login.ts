import request from '@/server/axios.ts'

export const loginUser = (userInfo:{}) => {
  return request({
    url: '/api/v1/auth/login',
    method: 'post',
    data: userInfo
  })
}

