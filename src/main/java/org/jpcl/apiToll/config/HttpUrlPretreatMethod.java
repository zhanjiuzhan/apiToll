package org.jpcl.apiToll.config;

import org.jpcl.apiToll.model.Api;
import org.jpcl.apiToll.service.ApiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Administrator
 */
@Component
public class HttpUrlPretreatMethod implements ApplicationContextAware, InitializingBean {
    private final Logger logger = LoggerFactory.getLogger(HttpUrlPretreatMethod.class);

    private ApplicationContext applicationContext;

    private List<Api> oldApis = new ArrayList<>();

    @Autowired
    ApiService ApiService;

    @Override
    public void afterPropertiesSet() throws Exception {
        oldApis = ApiService.gets();
        dealRequestMapping();
    }

    private void dealRequestMapping() {
        String[] beanNames = this.applicationContext.getBeanNamesForAnnotation(Controller.class);
        List<String> ApiUrls = new ArrayList<>();
        for (String beanName : beanNames) {
            Object obj = this.applicationContext.getBean(beanName);
            Method[] methods = obj.getClass().getMethods();
            RequestMapping requestMapping = obj.getClass().getAnnotation(RequestMapping.class);
            String[] urls = null;
            if (null != requestMapping) {
                urls = requestMapping.value();
            }
            for (Method method : methods) {
                List<String> retUrls = getRequestMappingMethodUrl(method);
                for (String url : retUrls) {
                    if (urls != null && urls.length > 0) {
                        ApiUrls.add(urls[0] + url);
                    } else {
                        ApiUrls.add(url);
                    }
                }
            }
        }

        if (ApiUrls.size() > 0) {
            addApi(ApiUrls);
        }
    }

    private List<String> getRequestMappingMethodUrl(Method method) {
        RequestMapping requestMapping = method.getAnnotation(RequestMapping.class);
        List<String> retUrls =  new ArrayList<>();
        if (null != requestMapping) {
            String[] urls = requestMapping.value();
            for (String url : urls) {
                if (url != null && url.trim().length() > 0) {
                    retUrls.add(url);
                }
            }
        }
        return retUrls;
    }

    private void addApi(List<String> urls) {
        List<Api> tmpOldApi = new ArrayList<>(oldApis);
        List<String> tmpUrls = new ArrayList<>(urls);
        for (Api Api : oldApis) {
            String url = Api.getUrl();
            if (urls.contains(url)) {
                logger.info("[ " + url + " ] 该权限已经存在无需添加了。");
                tmpOldApi.remove(Api);
                tmpUrls.remove(url);
            }
        }
        for (String url : tmpUrls) {
            logger.info("[ " + url + " ] 添加为新权限。");
            Api Api = new Api();
            Api.setUrl(url);
            ApiService.add(Api);
        }

        for (Api Api : tmpOldApi) {
            logger.info("[ " + Api.getUrl() + " ] 该权限已废弃。");
            ApiService.del(Api.getId());
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

}
