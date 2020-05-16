package org.jpcl.apiToll.controller;

import org.jpcl.apiToll.model.Api;
import org.jpcl.apiToll.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Administrator
 */
@RestController
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private ApiService apiService;

    /**
     * 添加一条数据
     * @param api
     * @return
     */
    @RequestMapping("/add")
    public int add(Api api) {
        return apiService.add(api);
    }

    /**
     * 修改
     * @param api
     * @return
     */
    @RequestMapping("/update")
    int update(Api api) {
        return apiService.update(api);
    }

    /**
     * 删除
     * @param id
     * @return
     */
    @RequestMapping("/del")
    int del(int id) {
        return apiService.del(id);
    }

    /**
     * 查询
     * @return
     */
    @RequestMapping("/gets")
    List<Api> gets() {
        return apiService.gets();
    }

    /**
     * 查询
     * @return
     */
    @RequestMapping("/save")
    int save(Api obj) {
        Api api = apiService.get(obj.getId());
        if (api == null) {
            return apiService.add(obj);
        } else {
            return apiService.update(obj);
        }
    }

}
