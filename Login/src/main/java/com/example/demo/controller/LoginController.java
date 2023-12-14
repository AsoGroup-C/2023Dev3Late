package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.UserService.UserService;
import com.example.demo.form.UserForm;

@Controller
public class LoginController {
	@GetMapping("index")
	public String indexView() {
		return "index";
	}
	@Autowired
	UserService service;
	@PostMapping("login")
	public String loginokView(UserForm userForm,Model model) {
		Optional<com.example.demo.entity.User> list=service.selectUserById(userForm.getUser_id());
		if(list.isPresent()) {
			com.example.demo.entity.User text = list.get();
			if(text.getPassword().equals(userForm.getPassword())) {
				model.addAttribute("name",text.getUser_name());
				return "login-ok";
			}
		}
		return "login-ng";
	}
}
