package com.ecommerce.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.ecommerce.demo.entity.Product;
import com.ecommerce.demo.entity.ProductCategory;

/*
 * Note RepositoryRestConfigurer: From Spring Data Rest
 * theUnsupporActions: disable Http methods 
 * forDomainType(Product.class): Xác định entity cần cấu hình là Product.
 * withItemExposure(...): Áp dụng cho một item cụ thể (ví dụ: /products/1).
 * withCollectionExposure(...): Áp dụng cho tập hợp (ví dụ: /products).
 * httpMethods.disable(...): Vô hiệu hóa các phương thức đã khai báo.
 */

/*
 * POST /api/products    ✅ (Thêm sản phẩm mới)
 * PUT /api/products/1   ✅ (Cập nhật sản phẩm)
 * DELETE /api/products/1 ✅ (Xóa sản phẩm)
 * 
 * POST /api/products    ❌ (405 Method Not Allowed)
 * PUT /api/products/1   ❌ (405 Method Not Allowed)
 * DELETE /api/products/1 ❌ (405 Method Not Allowed)
 * GET /api/products     ✅ (Lấy danh sách sản phẩm)
 * GET /api/products/1   ✅ (Lấy chi tiết sản phẩm)
 */

@Configuration()
public class MyDataRestConfig implements RepositoryRestConfigurer{

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupporActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
        // disable Http methods for Product: PUT, POST, DELETE
        config.getExposureConfiguration().forDomainType(Product.class)
        .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupporActions))
        .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupporActions));

        // disable Http methods for Product: PUT, POST, DELETE
        config.getExposureConfiguration().forDomainType(ProductCategory.class)
        .withItemExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupporActions))
        .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupporActions));


        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
    }

}
