package org.jpcl.apiToll.controller;

import org.jpcl.apiToll.config.TestJavaConfigBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Administrator
 */
@Controller
public class IndexController {

    @Autowired
    private TestJavaConfigBean bean;

    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/show")
    @ResponseBody
    public String show() {
        return bean.toString();
    }
}
