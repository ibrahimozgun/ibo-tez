
export const getResponseCode = res => {
  return res?.data?.status ?? 400;
}

export const getData = res => {
  return res?.data?.content || res?.content;
}
