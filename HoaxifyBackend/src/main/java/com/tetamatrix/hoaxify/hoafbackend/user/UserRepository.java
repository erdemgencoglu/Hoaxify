/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.tetamatrix.hoaxify.hoafbackend.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author pln226
 */
//ilk parametre hangi sınıf için 2 parametre sınıfa ait id değişkeninin tipi
//JpaRepository database e erişmemize olanak sağlayan belli methodlar içeren bir interfacedir
public interface UserRepository extends JpaRepository<User, Long> {

    //Arka planda spring data methoda karşılık gelen queryi üretip veritabanı işlemlerini otomatik sağlar
    User findByUsername(String username);
}
