package com.finki.ukim.mk.library.excel.obj.impl;

import java.util.List;

public class ObjectToExcel implements com.finki.ukim.mk.library.excel.obj.ObjectToExcel {
    private ExcelHeaderMetaData headerMetaData;
    private ExcelData data;

    public ObjectToExcel(ExcelHeaderMetaData headerMetaData, ExcelData data) {
        this.headerMetaData = headerMetaData;
        this.data = data;
    }

    @Override
    public List<String> getHeaderMetadata() {
        return headerMetaData.headers;
    }

    @Override
    public List<List<String>> getDataRows() {
        return data.getDataRows();
    }
}
