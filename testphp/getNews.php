<?php
$newsID = 54;
$limit = 99;
$output = '';

$modx->addPackage('pdoTools', MODX_CORE_PATH . 'components/pdotools/model/');

$newsList = $modx->runSnippet('pdoResources', array(
    'news' => $newsID,
    'limit' => $limit,
    'sortby' => 'publishedon',
    'sortdir' => 'DESC',
    'tpl' => '@CODE:<div class="news-item">
        <img class="news-item-preview" src="[[+preview_image]]">
        <div class="news-item-title">[[+pagetitle]]</div>
        <div class="news-item-text" style="content">[[+content:stripTags:ellipsis=`200`]]</div>
        <div class="news-item-pubdate">[[+publishedon:date=`%d.%m.%Y`]]</div>
    </div>'
));

if (!empty($newsList)) {
    $output = '<div class="news">' . $newsList . '</div>';
}

return $output;
?>
