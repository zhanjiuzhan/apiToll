package org.jpcl.apiToll.model;

import java.util.Date;

/**
 * @author Administrator
 */
public class Api {
    private int id;
    private String url;
    private String des;
    private String content;
    private Date update;
    private String demo1;
    private String demo2;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getUpdate() {
        return update;
    }

    public void setUpdate(Date ipdate) {
        this.update = ipdate;
    }

    public String getDemo1() {
        return demo1;
    }

    public void setDemo1(String demo1) {
        this.demo1 = demo1;
    }

    public String getDemo2() {
        return demo2;
    }

    public void setDemo2(String demo2) {
        this.demo2 = demo2;
    }

    @Override
    public String toString() {
        return "Api{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", des='" + des + '\'' +
                ", content='" + content + '\'' +
                ", update=" + update +
                ", demo1='" + demo1 + '\'' +
                ", demo2='" + demo2 + '\'' +
                '}';
    }
}
