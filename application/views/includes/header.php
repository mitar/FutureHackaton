<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

    <?php
    $obj_title = $this->config->item('meta_title');
    if(isset($item->title)){
        $obj_title = $item->title;
    }
    $obj_description_meta = "";
    echo '<meta name="description" content="'.strip_tags($obj_description_meta).'" />';
    echo '<title>'.strip_tags($obj_title).'</title>';
    ?>

    <!--[if IE]>
    <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
    <![endif]-->
    <meta name="author" content="CHERR.IO">
    <?php
    if(isset($fb_share) && $fb_share && isset($item->id)){
        $img = json_decode($this->main_model->ReturnPageMedia($item->id, null,9));
        ?>
        <meta property="og:title" content='<?=strip_tags($item->title)?>' />
        <meta property="og:type" content="article" />
        <meta property="og:image" content='<?= CONST_IMG_URL. str_replace(' ', '%20',$img[0]->path);?>' />
        <meta property="og:url" content='<?php echo $share_url; ?>' />
        <meta property="og:description" content='<?=strip_tags(truncate($item->short_description,100))?>' />
        <?php
    }
    ?>

    <link rel="icon" href="<?php echo base_url(); ?>img/favicon.png" type="image/png" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>
<body class="<?php echo (isset($page_name)) ? $page_name : '';?>">

<script>
    var base_url = "<?php echo base_url(); ?>";
    var base_urll = "<?php echo base_url(LANGUAGE); ?>/";
    var current_url = "<?php echo base_url().LANGUAGE.uri_string(); ?>";
    var CONST_MEDIA_URL = "<?php echo CONST_IMG_URL; ?>";
</script>

<div id="fb-root"></div>
<script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.7&appId=<?php echo $this->config->item('fb_app_id'); ?>";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

