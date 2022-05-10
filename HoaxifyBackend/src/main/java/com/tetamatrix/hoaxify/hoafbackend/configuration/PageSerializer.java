/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import java.math.BigDecimal;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.data.domain.Page;

/**
 *
 * JsonViewBase yöntemini kullanan bir methodun
 * yönetimimizde olmayan bir classın nasıl customize edildiği
 */
@JsonComponent
public class PageSerializer extends JsonSerializer<Page<?>>{

    @Override
    public void serialize(Page<?> value, JsonGenerator jg, SerializerProvider sp) throws IOException {
        jg.writeStartObject();
        jg.writeFieldName("content");
        sp.defaultSerializeValue(value.getContent(), jg);
        jg.writeObjectField("pageable", value.getPageable());
        jg.writeBooleanField("last", value.isLast());
        jg.writeNumberField("totalPages", value.getTotalPages());
        jg.writeNumberField("totalElement", value.getTotalElements());
        jg.writeNumberField("size", value.getSize());
        jg.writeNumberField("number", value.getNumber());
        jg.writeObjectField("sort", value.getSort());
        jg.writeNumberField("numberOfElements", value.getNumberOfElements());
        jg.writeBooleanField("first", value.isFirst());
        jg.writeBooleanField("empty", value.isEmpty());
        jg.writeEndObject();
    }
    
}
