$(function () {
    
    $(".IncreaseCartQuantity").on('click', function(){
        update_price($(this).data("id"), 1);
    });

    $(".DecreaseCartQuantity").on('click', function(){
        update_price($(this).data("id"), -1);
    });

    function update_price(id, factor) {
        let qty = Number($('#qty_' + id).html()) + factor;

        if(qty >= 1){
            let itemPrice = Number($('#price_' + id).html());
            let currentTotal = (qty * itemPrice);
            $('#qty_' + id).html(qty);
            $('#total_' + id).html(currentTotal.toFixed(2));

            let element = $('#save_' + id);
            let original = Number(element.data("original"));
            original != qty ? element.show() : element.hide();
        }
        else{
            qty = 1;
        }
    // }

    // $('#Save').on('click', function(){
    //     let id = $(this).data('id');
        var new_qty = $('#qty_' + id).html();
        $.ajax({
            headers: {"Content-Type": "application/json"},
            url: "../../api/cartitem",
            type: 'put',
            data: JSON.stringify({
                "id": id,
                "qty": new_qty
            }),
            success: function (response, textStatus, jqXhr) {
                // success
                var element = $('#save_' + id);
                element.attr('data-original', new_qty);
                element.data("original", new_qty);
                element.hide();
                toast('Success' ,"Product Quantity Increased");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                console.log("The following error occured: " + jqXHR.status, errorThrown);
                toast("Error", "Please try again later.");
            }
        })
    };

    $('.RemoveItem').on('click', function(){
        var id = $(this).data('id');
        $.ajax({
            headers: {"Content-Type": "application/json"},
            url: "../../api/cartitem",
            type: 'delete',
            data: JSON.stringify({
                "id": id,
            }),
            success: function(response, textStatus, jqXhr) {
                // success 
                $("#row_" + id).remove();
                toast("Confirmation", "Item Removed");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // logging error to console
                console.log("This error occured: " + jqXHR.status, errorThrown);
                toast("Error", "Please try again later.");
            }
        })
    });
});