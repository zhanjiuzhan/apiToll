package org.jpcl.apiToll.service;

import org.jpcl.apiToll.dao.ApiMapper;
import org.jpcl.apiToll.model.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Administrator
 */
@Service
public class ApiService {

    @Autowired
    private ApiMapper apiMapper;

    /**
     * 添加一条数据
     * @param api
     * @return
     */

    public int add(Api api) {
        return apiMapper.add(api);
    }

    /**
     * 修改
     * @param api
     * @return
     */

    public int update(Api api) {
        return apiMapper.update(api);
    }

    /**
     * 删除
     * @param id
     * @return
     */

    public int del(int id) {
        return apiMapper.del(id);
    }

    /**
     * 查询
     * @return
     */

    public List<Api> gets() {
        return apiMapper.gets();
    }

}
