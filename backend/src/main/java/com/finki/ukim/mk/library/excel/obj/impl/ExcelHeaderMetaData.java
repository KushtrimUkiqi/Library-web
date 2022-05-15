package com.finki.ukim.mk.library.excel.obj.impl;

import java.util.LinkedList;
import java.util.List;

public class ExcelHeaderMetaData {
    public List<String> headers;

    public ExcelHeaderMetaData(List<String> headers) {
        this.headers = headers;
    }

    public ExcelHeaderMetaData() {
        this.headers = new LinkedList<>();
    }

    public void addHeader(String header)
    {
        this.headers.add(header);
    }


}
