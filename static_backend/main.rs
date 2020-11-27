use std::io::Read;
use actix_files::Files;
use actix_web::{middleware, web, App, HttpRequest, HttpResponse, HttpServer, Responder, guard};

async fn get_index_html(_: HttpRequest) -> impl Responder {
    match std::fs::File::open(format!("www/frontend_artifact/index.html")) {
        Ok(mut file) => {
            let mut contents = String::new();
            file.read_to_string(&mut contents).unwrap_or_default();

            HttpResponse::Ok()
                .content_type("text/html; charset=utf-8")
                .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
                .header("pragma", "no-cache")
                .header("x-ua-compatible", "IE=edge, Chrome=1")
                .body(contents)
        },
        Err(e) => {
            println!("index.html is not found - {}", e);

            HttpResponse::Ok()
                .content_type("text/html; charset=utf-8")
                .header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
                .header("pragma", "no-cache")
                .header("x-ua-compatible", "IE=edge, Chrome=1")
                .body("Resource not found")
        }
    }
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    if std::env::var("RUST_LOG").is_err() {
        std::env::set_var("RUST_LOG", "actix_web=info");
    }
    env_logger::init();

    println!("Server is running at http://localhost:8088/");

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .service(Files::new("/scripts", "www/frontend_artifact/scripts/").show_files_listing())
            .default_service(
                web::resource("")
                    .route(web::get().to(get_index_html))
                    .route(
                        web::route()
                            .guard(guard::Not(guard::Get()))
                            .to(|| HttpResponse::MethodNotAllowed()),
                    ),
            )
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}
