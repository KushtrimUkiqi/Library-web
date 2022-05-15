package com.finki.ukim.mk.library.excel.obj.impl;

import java.util.LinkedList;
import java.util.List;

public class ExcelData {
    private List<List<String>> dataRows;

    public ExcelData(List<List<String>> dataRows) {
        this.dataRows = dataRows;
    }

    public ExcelData() {
        this.dataRows = new LinkedList<>();
    }

    public void addRow(List<String> newRow)
    {
        this.dataRows.add(newRow);
    }

    public List<List<String>> getDataRows() {
        return dataRows;
    }
}
