# README

## Set Up Devise
- $ rails new stockbyte_app -d postgresql -T
- $ cd apartment_app
- $ bundle add devise
- $ rails generate devise:install
- $ rails generate devise User
- $ rails generate devise:views
- $ rails db:create
- $ rails db:migrate

## Add React
- $ bundle add react-rails
- $ bundle install
- $ rails webpacker:install
- $ rails webpacker:install:react
- $ rails generate react:install
- $ yarn install

## Generate a New React Component
- $ rails g react:component App

## Add a Homepage
- $ rails g controller Home

## Create Homepage
- ./config/routes.rb
```
get '*path', to: 'home#root', constraints: ->(request){ request.format.html? }
root to: 'home#root'
```

- create root.html.erb in ./app/views/home
```
///variables and paths created by Devise, pass to App.js
<%= react_component("App", {
    logged_in: user_signed_in?,
    sign_in_route: new_user_session_path,
    sign_out_route: destroy_user_session_path,
    edit_user_route: edit_user_registration_path,
    current_user: current_user
}) %>
```
- ./app/controllers/home_controller.rb
```
def root
end
```
- ./config/initializers/devise.rb
> change ```config.sign_out_via = :delete```
> to ```config.sign_out_via = :get```

- ./app/javascript/component/App.js
>create react component here


### Add Bootswatch
- $ npm install bootswatch
- $ yarn install --check-files
- add to app.js
```
import 'bootswatch/dist/litera/bootstrap.min.css'
```
