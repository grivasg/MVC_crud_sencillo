<?php

namespace Controllers;

use Exception;
use Model\Producto;
use MVC\Router;

class DetalleController {

    public static function estadisticas(Router $router) {  
        $router->render('productos/estadisticas');
    }

    public static function detalleVentasAPI() {  
        try {

            $sql = 'SELECT producto_nombre as producto, sum(detalle_cantidad) as cantidad from detalle_ventas
            INNER JOIN productos on detalle_producto = producto_id where detalle_situacion = 1
            GROUP BY producto_nombre';

            $datos = Producto::fetchArray($sql);

            echo json_encode($datos);
        } catch (Exception $e) {
            echo json_encode([
                'detalle' => $e->getMessage(),
                'mensaje' => 'Ocurrio un error',
                'codigo' => 0
            ]);
        }
    }

}