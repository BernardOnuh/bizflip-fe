<div className={cx(styles.button)} >
<div className>
  <IconButton className={styles.swipeButtons_repeat}>
    <ReplayIcon fontSize="large" />
  </IconButton>
  <IconButton className={styles.swipeButtons_left}>
    <CloseIcon fontSize="large" />
  </IconButton>
  <Link href="/favourite" passHref>
    <IconButton className={styles.swipeButtons_star}>
      <StarRateIcon fontSize="large" />
    </IconButton>
  </Link>
  <IconButton className={styles.swipeButtons_right}>
    <FavoriteIcon fontSize="large" />
  </IconButton>
  <Link href="/subscription" passHref>
    <IconButton className={styles.swipeButtons_lightning}>
      <FlashOnIcon fontSize="large" />
    </IconButton>
  </Link>
</div>
</div>




