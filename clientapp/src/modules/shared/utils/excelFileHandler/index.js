import { utils, writeFile } from 'xlsx'

export const exportAsXlsxFile = (data, fileName) => {
  const worksheet = utils.json_to_sheet(data)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, fileName)
  writeFile(workbook, `${fileName}` + '.xlsx')
}
