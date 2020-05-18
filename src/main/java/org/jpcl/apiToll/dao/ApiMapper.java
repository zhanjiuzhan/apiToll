package org.jpcl.apiToll.dao;

import org.apache.ibatis.annotations.*;
import org.jpcl.apiToll.model.Api;

import java.util.List;

/**
 * @author Administrator
 */
@Mapper
public interface ApiMapper {

    /**
     * 添加一条数据
     * @param api
     * @return
     */
    @Insert("INSERT INTO api(url, des, content, demo1, demo2) VALUES (#{url}, #{des}, #{content}, #{demo1}, #{demo2})")
    int add(Api api);

    /**
     * 修改
     * @param api
     * @return
     */
    @Update("UPDATE api SET des=#{des}, content=#{content}, demo1=#{demo1}, demo2=#{demo2} WHERE id=#{id}")
    int update(Api api);

    /**
     * 删除
     * @param id
     * @return
     */
    @Delete("DELETE FROM api WHERE id=#{id}")
    int del(int id);

    /**
     * 查询
     * @return
     */
    @Select("SELECT * FROM api")
    List<Api> gets();

    /**
     * 查询一个
     * @param id
     * @return
     */
    @Select("SELECT * FROM api WHERE id=#{id}")
    Api get(int id);
}
