package com.finki.ukim.mk.library.excel.obj;

import java.util.List;

public interface ObjectToExcel {
    public List<String> getHeaderMetadata();
    public List<List<String>> getDataRows();
}
