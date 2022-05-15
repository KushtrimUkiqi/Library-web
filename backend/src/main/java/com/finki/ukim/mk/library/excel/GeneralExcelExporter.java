package com.finki.ukim.mk.library.excel;

import com.finki.ukim.mk.library.excel.obj.impl.ExcelHeaderMetaData;
import com.finki.ukim.mk.library.excel.obj.impl.ExcelData;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class GeneralExcelExporter{

    private XSSFWorkbook workbook;

    public GeneralExcelExporter() {
        this.workbook = new XSSFWorkbook();
    }

    public void generateExcel(String name, ExcelHeaderMetaData headerMetaData, ExcelData data, HttpServletResponse response) throws IOException {
        var sheet = createSheet(name);

        CellStyle headerStyle = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(12);
        headerStyle.setFont(font);

        createRow(sheet,0,headerMetaData.headers,headerStyle);

        List<List<String>> dataRows = data.getDataRows();

        CellStyle dataStyle = workbook.createCellStyle();
        font.setBold(false);
        dataStyle.setFont(font);

        for (int i = 0; i < dataRows.size(); i++) {
            createRow(sheet,i+1,dataRows.get(i),dataStyle);
        }

        ServletOutputStream outputStream = response.getOutputStream();

        workbook.write(outputStream);
        workbook.close();

        outputStream.close();

    }

    private XSSFSheet createSheet(String name)
    {
        return workbook.createSheet(name);
    }

    private void createRow(XSSFSheet sheet,int rowNum ,List<String> rowData,CellStyle style)
    {
        Row row = sheet.createRow(rowNum);

        for (int i = 0; i < rowData.size(); i++) {
            createCell(row,i,rowData.get(i),style);
        }
    }

    private void createCell(Row row,int columnNum,String value,CellStyle style)
    {
        Cell cell = row.createCell(columnNum);
        cell.setCellValue(value);
        cell.setCellStyle(style);
    }
}
